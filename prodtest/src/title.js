import React, { PropTypes, Component } from 'react'
// import { Cell } from '../../../core/grid/cell'

export class Title extends Component {
  render () {
  const {width, content} = this.props
  return <div>
            {content}
          </div>
  }
}

Title.propTypes = {
  content: PropTypes.object
}
