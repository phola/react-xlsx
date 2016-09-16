import React, { PropTypes, Component } from 'react'
import { Cell } from '../index'

export default class SubTest extends Component {
  render () {
  const {content, cellRef} = this.props
  return <Cell cellRef={cellRef}>
            {content}
          </Cell>
  }
}
