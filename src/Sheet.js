import React, { Component } from 'react';

export class Sheet extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    children: React.PropTypes.node
  };

  render() {
    const { children } = this.props
    if (typeof children === 'string') return <span>{children}</span>
    return <div>{children}</div>
  }
}
