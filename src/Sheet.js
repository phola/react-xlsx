import React, { Component } from 'react';

export class Sheet extends Component {

  getChildContext() {
    var { name = 'Sheet1'} = this.props
    return { sheet: name };
  }

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
  sheet: React.PropTypes.string
};
