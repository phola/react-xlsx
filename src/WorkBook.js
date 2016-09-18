import React, { Component } from 'react'
import XLSX from 'xlsx-style'
import s2ab from './s2ab'
import { groupBy } from 'lodash'

// note this component goes against typical react practice of one way top down data flow to allow
// the user to arbitrarly place sheets and cell components anywhere in the component heirarchy.
// the ancestor components broadcast values up to the WorkBook via context.

export class WorkBook extends Component {

  constructor (props) {
    super(props)
    this.state = { cells: [] }
  }

  getChildContext () {
    return {
      getCell: this.getCell.bind(this),
      noRender: this.props.noRender,
      toXLSX: this.toXLSX.bind(this)
    }
  }

  getCell (val) {
    var { cells } = this.state
    var cell = cells.find(c => c.cellRef === val.cellRef)
    if (cell) {
      cell = val
    }else {
      cells.push(val)
    }
    this.setState({ cells: cells })
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

  toJSON (cb) {
    const { children, title, author } = this.props
    var wb
    var sheets = groupBy(this.state.cells, 'sheet')
    if (sheets) {
      wb = { Sheets: {}, SheetNames: [] }
      Object.keys(sheets).forEach(sheet => {
        wb.SheetNames.push(sheet)
        wb.Sheets[sheet] = this.mapCells(sheets[sheet])
      }
      )
    }
    if (cb) {
      cb(wb)
    }
    else {
      return wb
    }
  }

  writeXLSX (wb) {
    const { defaultCellStyle } = this.props
    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle }
    return XLSX.write(wb, wopts)
  }

  toXLSX (wb = this.toJSON()) {
    var blob = new Blob([s2ab(this.writeXLSX(wb))], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    if (this.props.toXLSXCallback) {
      this.props.toXLSXCallback(blob)
    }
    else {
      return blob
    }
  }

  render () {
    const { children, generateXLSX = false, toXLSXCallback } = this.props

    if (generateXLSX && toXLSXCallback) this.toXSLX()

    return <div>{children}</div>

  }
}

WorkBook.propTypes = {
  title: React.PropTypes.string,
  author: React.PropTypes.string,
  noRender: React.PropTypes.bool,
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
  renderCells: true
}

WorkBook.childContextTypes = {
  getCell: React.PropTypes.func,
  toXLSX: React.PropTypes.func,
  noRender: React.PropTypes.bool
}
