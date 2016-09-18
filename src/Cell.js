import React, { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import XLSX from 'xlsx-style'

export class Cell extends Component {

  componentDidMount () {
    if (this.context && this.context.getCell) this.context.getCell(this.mapCell(this.props))
  }

  shouldComponentUpdate (nextProps, nextState) {
    var updated = shallowCompare(this, nextProps, nextState)
    if (updated) {
      if (this.context && this.context.getCell) this.context.getCell(this.mapCell(nextProps))
    }
    return updated
  }

  mapCell (props) {
    var { cellRef, col, row, colSpan, rowSpan, children = '', cellStyle = {}, type = 's', formula } = props
    var { sheet = 'Sheet1' } = this.context
    var cell_ref, merge

    if (cellRef) {
      var { r: row, c: col } = XLSX.utils.decode_cell(cellRef)
      cell_ref = cellRef
    } else {
      cell_ref = XLSX.utils.encode_cell({c: col, r: row})
    }

    if (colSpan || rowSpan) {
      colSpan = colSpan ? colSpan : 1
      rowSpan = rowSpan ? rowSpan : 1
      merge = { s: { c: col, r: row }, e: { c: col + colSpan - 1, r: row + rowSpan - 1 } }
    }

    var mapped = {
      t: type,
      s: cellStyle
    // c: [{a: 'comment.author', t: 'comment.t', r: 'comment.r'}]
    }
    // formulas not supported at the mo
    if (formula) {
      mapped.f = children
    }else {
      mapped.v = children
    }

    return { cellRef: cell_ref, data: mapped, merge: merge, col: col, row: row, sheet: sheet }
  }

  render () {
    if (!this.context || !this.context.noRender) {
      const { children } = this.props
      if (typeof children === 'string') return <span>{children}</span>
      return children
    }
    return null
  }
}

// todo add better prop validation
Cell.propTypes = {
  row: React.PropTypes.number,
  col: React.PropTypes.number,
  cellRef: React.PropTypes.string,
  children: React.PropTypes.string,
  cellStyle: React.PropTypes.object
}

Cell.contextTypes = {
  getCell: React.PropTypes.func,
  sheet: React.PropTypes.string,
  noRender: React.PropTypes.bool
}
