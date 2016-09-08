import React, { Component } from 'react';

export class XTrigger extends Component {
  static propTypes = {
    action: React.PropTypes.string,
    children: React.PropTypes.object
  };

  render() {
    const { children } = this.props
    if (typeof children === 'string') return <span>{children}</span>
    return children
  }
}
