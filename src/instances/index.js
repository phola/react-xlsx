import React from 'react'
import { WorkBook, Sheet, Cell, XTrigger } from '../index'
import FileSaver from 'file-saver'

const defaultCellStyle = { font: { name: 'Verdana', sz: 11, color: 'FF00FF88' }, fill: { fgColor: { rgb: 'FFFFAA00' } } }

const handleXLSX = (blob) => {
  console.log(blob)
  FileSaver.saveAs(blob, 'test.xlsx')
}

export const simple = () => {
  return (<WorkBook defaultCellStyle={defaultCellStyle} onXLSXGenerated={handleXLSX} render='trigger'>
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
                I am bold
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
