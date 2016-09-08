import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import WorkBook from '../WorkBook'
import XCell from '../XCell'
import Sheet from '../Sheet'
import XTrigger from '../XTrigger'
import FileSaver from 'file-saver'
import { simple } from '../instances'

const defaultCellStyle = { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}}

storiesOf('WorkBook', module).addWithInfo(
    'simple usage (no render)',
    'dfsdfdsf',
    () => {
      return simple()
    }
  ).addWithInfo(
      'tiny',
      'dfsdfdsf',
      () => {
        const handleXLSX = (blob) => {
          console.log(blob)
          FileSaver.saveAs(blob, 'formulae.xlsx')
        };
        return (
          <WorkBook render='only trigger'><div>ts</div></WorkBook>
        )
      }).addWithInfo(
      'with style',
      'dfsdfdsf',
      () => {
        const handleXLSX = (blob) => {
          console.log(blob)
          FileSaver.saveAs(blob, 'formulae.xlsx')
        };
        return (
          <WorkBook defaultCellStyle={defaultCellStyle} onXLSXGenerated={handleXLSX} onlyRenderTrigger={true}>
            <XCell row={0} col={1} type='n'>0.1</XCell>
            <XCell row={1} col={1} type='n'>2.3</XCell>
            <XCell row={1} col={2}>2.3</XCell>
            <XCell cellRef='B3' formula={true}>B1+B2</XCell>
            <XTrigger action='onClick'>
              <button>get XLSX</button>
            </XTrigger>
          </WorkBook>
        );
      }
    ).addWithInfo(
        'wrap exisiting Components',
        'dfsdfdsf',
        () => {
          const handleXLSX = (blob) => {
            console.log(blob)
            FileSaver.saveAs(blob, 'test.xlsx')
          };
          return (
            <WorkBook defaultCellStyle={defaultCellStyle} onXLSXGenerated={handleXLSX} >
              <h1><XCell cellRef='A1' colSpan={3}>Kites</XCell></h1>
              <p> <XCell cellRef='A2' colSpan={3}>Blah Blah</XCell> </p>
            <table border={1}>
              <tr>
                <td><XCell row={2} col={0}>Naish</XCell></td>
                <td><XCell row={2} col={1}>Cabrihna</XCell></td>
                <td><XCell row={2} col={2}>Best</XCell></td>
              </tr>
              <tr>
                <td><XCell row={3} col={0}>Naish</XCell></td>
                <td><XCell row={3} col={1}>Naish</XCell></td>
                <td><XCell row={3} col={2}>Naish</XCell></td>
              </tr>
            </table>
            <XTrigger action='onClick'>
              <button>get XLSX</button>
            </XTrigger>
            </WorkBook>
          );
        }
      );
