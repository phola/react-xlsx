import React, { Component } from 'react';

export class Cell extends Component {
  static propTypes = {
    row: React.PropTypes.number,
    col: React.PropTypes.number,
    cellRef: React.PropTypes.string,
    children: React.PropTypes.node,
    cellStyle: React.PropTypes.object
  };

  render() {
    const { children } = this.props
    if (typeof children === 'string') return <span>{children}</span>
    return children
  }
}
