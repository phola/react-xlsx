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
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
<WorkBook onXLSXGenerated={handleXLSX}>
  <Cell cellRef='C9'>yay</Cell>
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
