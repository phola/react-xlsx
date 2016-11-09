import React, { Component } from 'react'
import XLSX from 'xlsx-style'
import s2ab from './s2ab'
import { recursiveCloneChildrenAddPropstoType } from './reactUtils'
import { groupBy, isObject } from 'lodash'

import ReactDOMServer from 'react-dom/server'

// note this component goes against typical react practice of one way top down data flow to allow
// the user to arbitrarly place sheets and cell components anywhere in the component heirarchy.
// the ancestor components broadcast values up to the WorkBook via context.

export class WorkBook extends Component {

  constructor (props) {
    super(props)
    this.test = this.test.bind(this);
    this.toXLSX2 = this.toXLSX2.bind(this);
    this.state = { cells: [] }
  }

  getChildContext () {
    return {
      getCell: this.getCell.bind(this),
        getSheet: this.getSheet.bind(this),
      noRender: this.props.noRender,
      toXLSX: this.toXLSX.bind(this)
    }
  }

//only update if children have changed?
  shouldComponentUpdate (nextProps, nextState) {
    return (this.props.children != nextProps.children)
  }

  getSheet(val) {
        debugger
    }

  getCell (val) {
    var { cells } = this.state
    var cell = cells.find(c => (c.cellRef === val.cellRef && c.sheet === val.sheet))

    if (cell) {
      cell = val
    }else {
      cells.push(val)
      this.setState({ cells: cells })
    }
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
    const { children, title, author, useFirstRowWidths } = this.props
    var wb
    var sheets = groupBy(this.state.cells, 'sheet')
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
            cols[fc.col] = {wch:Math.round(fc.width/23)}
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
    if (this.props.toXLSXCallback) {
      this.props.toXLSXCallback(blob)
    }
    else {
      return blob
    }
  }

  toJSON (wb = this.getWB()) {
    if (this.props.toJSONCallback) {
      this.props.toJSONCallback(wb)
    }
    else {
      return wb
    }
  }

  test () {
    const { children, title, author, useFirstRowWidths } = this.props
    debugger
    const XChildren = this.recursiveCloneChildren(children)
    const sheets = deepFilterByComponentType(XChildren, 'Sheet').map(sheet => {
      if (!sheet.props) return null
      return {name: sheet.props.name, cells: sheet.props.children ? deepFilterByComponentType(sheet.props.children, 'Cell').map(cell => this.mapCell(cell.props)) : []}
    })

    var wb
    if (sheets) {
      wb = { Sheets: {}, SheetNames: [] }
      sheets.forEach(sheet => {
        wb.SheetNames.push(sheet.name)
        wb.Sheets[sheet.name] = this.mapCells(sheet.cells)
        if (useFirstRowWidths) {
          const fcols = sheet.cells.filter(cell => cell.row === 0)
          const cols = new Array(fcols.length)
          const filtered = fcols.filter(cell => cell.width)
          filtered.forEach(fc => {
            cols[fc.col] = {wch:Math.round(fc.width/23)}
          })
        wb.Sheets[sheet.name]['!cols'] = cols
      }
      }
      )
    }

    // debugger
    return wb
  }

  toXLSX2 (wb = this.test()) { 
    // debugger   
    var blob = new Blob([s2ab(this.writeXLSX(wb))], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    if (this.props.toXLSXCallback) {
      this.props.toXLSXCallback(blob)
    }
    else {
      return blob
    }
  }

  render () {
    let { children, generateXLSX = false, toXLSXCallback, noRender } = this.props
    if (generateXLSX && toXLSXCallback) this.toXSLX()
    // const elementsTreeMod = recursiveCloneChildrenAddPropstoType(this, 'Sheet', {getCell: this.getCell.bind(this)})
    // const s = ReactDOMServer.renderToStaticMarkup(<div>{elementsTreeMod}</div>)
    debugger
    // const chil = this.recursiveCloneChildren(children)
    // debugger
    noRender = true
    return <div>
        <button onClick={() => this.toXLSX2()}>download</button>
        {!noRender && <div>{children}</div>}
    </div>
  }

  recursiveCloneChildren (children) {
    return React.Children.map(children, child => {
      if (!isObject(child)) return child
      var childProps = { children: this.recursiveCloneChildren(child.props.children) }
      return React.cloneElement(child, childProps)
    })
  }
}

WorkBook.propTypes = {
  title: React.PropTypes.string,
  author: React.PropTypes.string,
  noRender: React.PropTypes.bool,
  useFirstRowWidths: React.PropTypes.bool,
  toXLSXCallback: React.PropTypes.func,
  toJSONCallback: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ])
}

WorkBook.defaultProps = {
  title: 'generated by react-xlsx',
  author: 'react-xlsx',
  useFirstRowWidths: true
}

WorkBook.childContextTypes = {
  getSheet: React.PropTypes.func,
  getCell: React.PropTypes.func,
  toXLSX: React.PropTypes.func,
  noRender: React.PropTypes.bool
}
