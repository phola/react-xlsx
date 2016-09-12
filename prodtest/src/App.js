import React, { Component } from 'react';
import FileSaver from 'file-saver'
import logo from './logo.svg';
import './App.css';
import { WorkBook, Sheet, Cell, XTrigger } from '../../dist/index'

class App extends Component {

  render() {
    console.log('app)')
    const handleXLSX = (blob) => {
      console.log(blob)
      FileSaver.saveAs(blob, 'test.xlsx')
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
    let rows = pusher(1000)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <WorkBook  onXLSXGenerated={handleXLSX} render='trigger'>
                  {sheets.map(sheet =>
                    <Sheet key={sheet} name={'sheet ' + sheet}>
                      {cols.map(col =>
                        rows.map(row =>
                          <Cell row={row} col={col}>
                            {col + ', ' + row}
                          </Cell>)
                    )}
                    </Sheet>)}

                  <XTrigger action='onClick'>
                    <button>
                      get XLSX
                    </button>
                  </XTrigger>
                </WorkBook>
      </div>
    );
  }
}

export default App;
