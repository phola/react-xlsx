import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { recursiveCloneChildrenAddPropstoType } from './reactUtils'
import XLSX from 'xlsx-style'
import s2ab from './s2ab'
import { groupBy, isObject } from 'lodash'

export function WorkBookHOC (WrappedComponent, options = {render: true, debug: true, callback: true, generate: 'xslx'}) {
  class WorkBook extends WrappedComponent {
    constructor (props) {
      super(props)
      this.state = { cells: [] }
      this.cells = []
    }

// only update if children have changed?
    shouldComponentUpdate (nextProps, nextState) {
      return (this.props.children != nextProps.children)
    }

    

    getCell (val) {
      var cell = this.cells.find(c => (c.cellRef === val.cellRef && c.sheet === val.sheet))
      if (cell) {
        cell = val
      } else {
        this.cells.push(val)
      }
    }

    componentDidMount () {
      if (options.generate && this.cells && this.cells.length > 0) {
        this.toXLSX()
      }
    }

    componentDidUpdate () {
      if (options.generate) {
        this.toXLSX()
      }
    }

    render () {
      const elementsTree = super.render()
      // can't use context here as we'll be using ReactDOMServer.renderToStaticMarkup later (see below)

      // if there are a large amount of cells performnace degrades even if we render them as null (<!-- react-empty --/>)
      // mainly due to on-screen rendering
      // we give the option not to render to screen but that necessitates this hack: (is there a better way?)
      // this tree will only give us direct children, not any components deeper in the tree

      const elementsTreeMod = recursiveCloneChildrenAddPropstoType(elementsTree, 'Sheet', {getCell: this.getCell.bind(this)})

      if (options.render) return <span>{elementsTreeMod}</span>

      ReactDOMServer.renderToStaticMarkup(<div>{elementsTreeMod}</div>)
      console.log('xl')
      if (options.debug) {
        return (
        <div>
          <h2>WORKBOOKhoc Debugger Component</h2>
          <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      )
      }

      return null
    }

    updateRange (row, col, range) {
      if (range.s.r > row) { range.s.r = row }
      if (range.s.c > col) { range.s.c = col }
      if (range.e.r < row) { range.e.r = row }
      if (range.e.c < col) { range.e.c = col }
      return range
    }

    mapCells (cells) {
      var mapped = {}
      var merges = []
      if (cells.length > 0) {
        var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}}
        cells.forEach(cell => {
        var { cellRef, col, row, data, merge } = cell
        range = this.updateRange(row, col, range)
        if (merge) {
          merges.push(merge)
        }
        mapped[cellRef] = data
      })
        mapped = Object.assign(mapped, {'!ref': XLSX.utils.encode_range(range)}, {'!merges': merges})
      }
      return mapped
    }

    getWB () {
      const { title, author, useFirstRowWidths } = this.props
      var wb
      var sheets = groupBy(this.cells, 'sheet')
      if (sheets) {
        wb = { Sheets: {}, SheetNames: [] }
        Object.keys(sheets).forEach(sheet => {
        wb.SheetNames.push(sheet)
        wb.Sheets[sheet] = this.mapCells(sheets[sheet])
        if (useFirstRowWidths) {
          const fcols = sheets[sheet].filter(cell => cell.row === 0)
          const cols = new Array(fcols.length)
          const filtered = fcols.filter(cell => cell.width)
          filtered.forEach(fc => {
            cols[fc.col] = {wch: Math.round(fc.width / 23)}
          })
          wb.Sheets[sheet]['!cols'] = cols
        }
      }
      )
      }
      return wb
    }

    writeXLSX (wb) {
      const { defaultCellStyle } = this.props
      var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle }
      return XLSX.write(wb, wopts)
    }

    toXLSX (wb = this.getWB()) {
      var blob = new Blob([s2ab(this.writeXLSX(wb))], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      if (options.callback) {
        options.callback(blob)
      } else {
        return blob
      }
    }

    toJSON (wb = this.getWB()) {
      if (this.props.toJSONCallback) {
        this.props.toJSONCallback(wb)
      } else {
        return wb
      }
    }
  }

  WorkBook.childContextTypes = {
    getSheet: React.PropTypes.func,
    getCell: React.PropTypes.func,
    toXLSX: React.PropTypes.func,
    noRender: React.PropTypes.bool
  }

  return WorkBook
}
