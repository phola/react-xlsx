import React, { Component } from 'react';

export class XTrigger extends Component {
  static propTypes = {
    action: React.PropTypes.string,
    children: React.PropTypes.object
  };

  render() {
    const { children, action } = this.props
    var triggerEvent = {}
    triggerEvent[action] = () => this.context.toXLSX()
    var cloned = React.cloneElement(children, triggerEvent)
    return cloned
  }
}

XTrigger.contextTypes = {
  toXLSX: React.PropTypes.func
};
