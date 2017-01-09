import React, { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import XLSX from 'xlsx-style'


export const mapCell = (props, sheet) => {
    var { cellRef, col, row, colSpan, rowSpan, children = '', cellStyle = {}, type = 's', formula, width} = props
   
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

    return { cellRef: cell_ref, data: mapped, merge: merge, col: col, row: row, sheet: sheet, width: width }
  }

export class Cell extends Component {


  componentWillMount () {      
   // debugger
    if (this.context && this.context.getCell) {  
       var { sheet = 'Sheet1' } = this.context 
    this.context.getCell(mapCell(this.props, sheet))
    }
   //  debugger
    // if (this.context && this.context.getCell) this.context.getCell(this.mapCell(this.props))
   // debugger
  // this._reactInternalInstance.mountComponent = function() {return '';}
  }

  componentDidMount () {
   // debugger
    // if (this.context && this.context.getCell) this.context.getCell(this.mapCell(this.props))
   // debugger
  // this._reactInternalInstance.mountComponent = function() {return '';}
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   var updated = shallowCompare(this, nextProps, nextState)
  //   if (updated) {
  //     if (this.context && this.context.getCell) this.context.getCell(this.mapCell(nextProps))
  //   }
  //   return updated
  // }



  render () {
      const { children, style } = this.props
      return <div style={style}>{children}</div>
  }
}

// todo add better prop validation
Cell.propTypes = {
  row: React.PropTypes.number,
  col: React.PropTypes.number,
  cellRef: React.PropTypes.string,
  children: React.PropTypes.string,
  cellStyle: React.PropTypes.object,
  width: React.PropTypes.number,
  style: React.PropTypes.object
}

Cell.contextTypes = {
  getCell: React.PropTypes.func,
  sheet: React.PropTypes.string,
  noRender: React.PropTypes.bool
}
