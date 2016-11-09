import React, { Component } from 'react';
import FileSaver from 'file-saver'
import logo from './logo.svg';
import './App.css';
import { WorkBookHOC, Sheet, Cell, XTrigger } from '../../src/index'
import HocTest  from '../../src/instances/hoctest'
import { Title } from './title.js';

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
    let rows = pusher(10)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <HocTest/>
      </div>
    );
  }
}

export default App;
