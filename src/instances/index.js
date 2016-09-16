import React from 'react'
import { WorkBook, Sheet, Cell, XTrigger } from '../index'
import SubTest from './subtest'
import FileSaver from 'file-saver'

const defaultCellStyle = { font: { name: 'Verdana', sz: 11, color: 'FF00FF88' }, fill: { fgColor: { rgb: 'FFFFAA00' } } }

const handleXLSX = (blob) => {
  console.log(blob)
  FileSaver.saveAs(blob, 'test.xlsx')
}

export const simple = () => {
  return (<WorkBook defaultCellStyle={defaultCellStyle} toXLSXCallback={handleXLSX}>
            <Sheet name='woooo'>
              <Cell
                row={0}
                col={1}
                colSpan={2}
                rowSpan={6}>
                <div>
                  <div>
                    nested
                  </div>
                </div>
              </Cell>
            </Sheet>
            <Sheet name='hoooo'>
              <Cell row={1} col={2} cellStyle={{font: {bold: true}}}>
                I am bored
              </Cell>
              <Cell cellRef='C9'>
                plain string
              </Cell>
            </Sheet>
            <XTrigger action='onClick'>
              <button>
                get XLSX
              </button>
            </XTrigger>
          </WorkBook>)
}

const pusher = (x) => {
  let i = 0
  let a = []
  while (i < x) {
    i++
    a.push(i)
  }
  return a
}
const sheets = pusher(9)
let cols = pusher(10)
let rows = pusher(10)

export const big = () => {

  return (<WorkBook defaultCellStyle={defaultCellStyle} toXLSXCallback={handleXLSX} render={false}>
            {sheets.map(sheet =>
              <Sheet key={sheet} name={'sheet ' + sheet}>
                {cols.map(col =>
                  rows.map(row =>
                    <div
                      row={row}
                      col={col}>
                      {col + ', ' + row}
                    </div>)
              )}
              </Sheet>)}

            <XTrigger action='onClick'>
              <button>
                get XLSX
              </button>
            </XTrigger>
          </WorkBook>)
}

export const subtest = () => {
  return (<WorkBook defaultCellStyle={defaultCellStyle} toXLSXCallback={handleXLSX} render>
            <SubTest cellRef='C9' content='feesh'/>
            <SubTest cellRef='C10' content='feesh'/>
            <XTrigger action='onClick'>
              <button>
                get XLSX
              </button>
            </XTrigger>
          </WorkBook>)
}
