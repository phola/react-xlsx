import React from 'react'
import WorkBook from '../WorkBook'
import XCell from '../XCell'
import Sheet from '../Sheet'
import XTrigger from '../XTrigger'
import FileSaver from 'file-saver'

const defaultCellStyle = { font: { name: 'Verdana', sz: 11, color: 'FF00FF88' }, fill: { fgColor: { rgb: 'FFFFAA00' } } }

const handleXLSX = (blob) => {
  console.log(blob)
  debugger
  FileSaver.saveAs(blob, 'test.xlsx')
}

export const simple = () => {
  return (<WorkBook defaultCellStyle={defaultCellStyle} onXLSXGenerated={handleXLSX}>
            <Sheet name='woooo'>
              <XCell
                row={0}
                col={1}
                colSpan={2}
                rowSpan={6}>
                <div>
                  <div>
                    nested
                  </div>
                </div>
              </XCell>
            </Sheet>
            <Sheet name='hoooo'>
              <XCell row={1} col={2} cellStyle={{font: {bold: true}}}>
                I am bold
              </XCell>
              <XCell cellRef='C9'>
                plain string
              </XCell>
            </Sheet>
            <XTrigger action='onClick'>
              <button>
                get XLSX
              </button>
            </XTrigger>
          </WorkBook>)
}
