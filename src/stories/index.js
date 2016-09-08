import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { WorkBook, Sheet, Cell, XTrigger } from '../index'
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
          <WorkBook><div>ts</div></WorkBook>
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
            <Cell row={0} col={1} type='n'>0.1</Cell>
            <Cell row={1} col={1} type='n'>2.3</Cell>
            <Cell row={1} col={2}>2.3</Cell>
            <Cell cellRef='B3' formula={true}>B1+B2</Cell>
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
              <h1><Cell cellRef='A1' colSpan={3}>Kites</Cell></h1>
              <p> <Cell cellRef='A2' colSpan={3}>Blah Blah</Cell> </p>
            <table border={1}>
              <tr>
                <td><Cell row={2} col={0}>Naish</Cell></td>
                <td><Cell row={2} col={1}>Cabrihna</Cell></td>
                <td><Cell row={2} col={2}>Best</Cell></td>
              </tr>
              <tr>
                <td><Cell row={3} col={0}>Naish</Cell></td>
                <td><Cell row={3} col={1}>Naish</Cell></td>
                <td><Cell row={3} col={2}>Naish</Cell></td>
              </tr>
            </table>
            <XTrigger action='onClick'>
              <button>get XLSX</button>
            </XTrigger>
            </WorkBook>
          );
        }
      );
