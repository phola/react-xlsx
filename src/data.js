import { observable } from 'mobx'

const Data = observable({
  Workbook: {},
  Cells: [],
  addCell: (cell) => {
    this.Cells.push(cell)
  },
  addWorkbook: (name) => {
    this.Workbook = {name: name}
  }
}
 )

export default Data
