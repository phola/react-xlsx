import React, { Component } from 'react';

export class Sheet extends Component {

  //  constructor (props) {
  //   super(props)
  //   this.state = { cells: [] }
  // }

  getChildContext() {
    var { name = 'Sheet1'} = this.props
    return { sheet: name,
       getCell: this.props.getCell }
  }

  //  componentWillMount () {      
  //  debugger
  //   if (this.context && this.context.getSheet) {   
  //     this.context.getSheet(this.state.cells)
  //   }
  //  //  debugger
  //   // if (this.context && this.context.getCell) this.context.getCell(this.mapCell(this.props))
  //  // debugger
  // // this._reactInternalInstance.mountComponent = function() {return '';}
  // }

  //  getCell (val) {
  //   var { cells } = this.state
  //   var cell = cells.find(c => (c.cellRef === val.cellRef && c.sheet === val.sheet))

  //   if (cell) {
  //     cell = val
  //   }else {
  //     cells.push(val)
  //     this.setState({ cells: cells })
  //   }
  //   this.props.getSheet(val)
  // }

  render() {
    const { children } = this.props
    if (typeof children === 'string') return <span>{children}</span>
    return <div>{children}</div>
  }
}

Sheet.propTypes = {
  name: React.PropTypes.string,
  children: React.PropTypes.node
};

Sheet.childContextTypes = {
  sheet: React.PropTypes.string,
  getCell: React.PropTypes.func
};

Sheet.contextTypes = {
  getSheet: React.PropTypes.func
}
