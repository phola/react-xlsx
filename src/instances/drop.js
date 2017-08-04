import { workBookFromFile } from '../index'
import React, { PropTypes, Component } from 'react'
import Dropzone from 'react-dropzone'
export default class Drop extends React.Component {
  constructor () {
    super()
    this.state = { files: [] }
  }

  onDrop (files) {
    const updateState = file => {
      this.setState({
        files: [...this.state.files, ...[file]]
      })
    }
    files.forEach(file => {
      workBookFromFile(file, w => {
        file.Workbook = w
        updateState(file)
      })
    })
  }

  render () {
    return (
      <section>
        <div className='dropzone'>
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li>
                {f.name} - {f.size} bytes
                <ul>
                  <h3>Sheets</h3>
                  {f.Workbook.SheetNames.map(s => (
                    <li>
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    )
  }
}
