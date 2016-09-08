import React, { Component } from 'react'
import XLSX from 'xlsx-style'
import s2ab from './s2ab'
import { deepFilterByComponentType, deepFilterByType } from './reactUtils'
import Sheet from './Sheet'
import XCell from './XCell'
import XTrigger from './XTrigger'

class WorkBook extends Component {

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
        var { cellRef, col, row, colSpan, rowSpan, children, cellStyle = {}, type = 's', formula } = cell.props
        var cell_ref
        if (cellRef) {
          var { r: row, c: col } = XLSX.utils.decode_cell(cellRef)
          cell_ref = cellRef
        } else {
          cell_ref = XLSX.utils.encode_cell({c: col, r: row})
        }
        range = this.updateRange(row, col, range)
        if (colSpan || rowSpan) {
          colSpan = colSpan ? colSpan : 1
          rowSpan = rowSpan ? rowSpan : 1
          var merge = { s: { c: col, r: row }, e: { c: col + colSpan - 1, r: row + rowSpan - 1 } }
          merges.push(merge)
        }
        var values = children ? deepFilterByType(children, 'string') : []
        if (values.length > 0) {
          mapped[cell_ref] = {
            t: type,
            s: cellStyle
            // c: [{a: 'comment.author', t: 'comment.t', r: 'comment.r'}]
          }
          // formulas not supported at the mo
          if (formula) {
            mapped[cell_ref].f = values[0]
          }else {
            mapped[cell_ref].v = values[0]
          }
        }
      })
      mapped = Object.assign(mapped, {'!ref': XLSX.utils.encode_range(range)}, {'!merges': merges})
    }
    return mapped
  }

  mapSheets (sheets) {
    var mapped = { Sheets: {}, SheetNames: [] }
    sheets.forEach(sheet => {
      const { name, children } = sheet.props
      var cells = deepFilterByComponentType(children, XCell)
      mapped.Sheets[name] = this.mapCells(cells)
      mapped.SheetNames.push(name)
    })
    return mapped
  }

  createWorkBook () {
    const { children, title, author } = this.props
    var wb = {}
    var sheets = deepFilterByComponentType(children, Sheet)
    if (sheets.length > 0) {
      wb = this.mapSheets(sheets)
      wb.Props = { Title: title, Author: author }
    }else {
      var cells = deepFilterByComponentType(children, XCell)
      if (cells.length > 0) {
        wb.SheetNames = ['Sheet1']
        wb.Sheets = {}
        wb.Sheets['Sheet1'] = this.mapCells(cells)
      }
    }
    return wb
  }

  writeXLSX (wb) {
    const { defaultCellStyle } = this.props
    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle }
    return XLSX.write(wb, wopts)
  }

  generateXLSX () {
    var wb = this.createWorkBook()
    return new Blob([s2ab(this.writeXLSX (wb))], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
  }

  renderPreview () {
    return 'not implemented'
  }

  renderJSON () {
    return 'not implemented'
  }

  render () {
    const { children, render, generateXLSX = false, onXLSXGenerated } = this.props

    if (generateXLSX && onXLSXGenerated) onXLSXGenerated(this.generateXLSX())
    if (!render) return null
    var triggerElement
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (child.type === XTrigger && child.props && child.props.action) {
          var triggerEvent = {}
          triggerEvent[child.props.action] = () => {
            onXLSXGenerated(this.generateXLSX())}
          return React.cloneElement(child.props.children, triggerEvent)
        }else {
          if (render != 'only trigger') return child
        }
      }
    )
    return <div>{childrenWithProps}</div>
  }
}

WorkBook.propTypes = {
  title: React.PropTypes.string,
  author: React.PropTypes.string,
  render: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  children: (props, propName, componentName , ...rest) => {
    var prop = props[propName]
    if (deepFilterByComponentType(prop, XCell).length === 0) {
      return new Error(
        '`' + componentName + '` ' +
        'should have at leact one descendant XCell component'
      )
    }
  }
}

WorkBook.defaultProps = {
  title: 'generated by react-xlsx',
  author: 'react-xlsx',
  render: true
}

export default WorkBook
