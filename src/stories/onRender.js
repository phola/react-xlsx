import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '../index';
import WorkBook from '../WorkBook'
import XCell from '../XCell'
import Sheet from '../Sheet'

storiesOf('WorkBook', module).add(
    'renderXLSX setting ',
    () => {
      const defaultCellStyle = { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}}
      const handleXLSX = (blob) => {
        console.log(blob)
      };
      return (
        <div>
        <WorkBook ref='wb' fileName='bob.xlsx' render renderXLSX defaultCellStyle={defaultCellStyle} onXLSXRendered={handleXLSX}>
          <Sheet name='woooo'>
            <div>bob</div>
            <XCell row={0} col={1}><div><div>nested</div></div></XCell>
          </Sheet>
          <Sheet name='hoooo'>
            <XCell row={1} col={2} style={{font:{bold:true}}}>I am bold</XCell>
            <XCell cellRef='C9'>plain string</XCell>
          </Sheet>
        </WorkBook>
        </div>
      );
    }
  );
