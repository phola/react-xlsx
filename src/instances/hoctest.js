import React, { PropTypes, Component } from 'react'
import { WorkBookHOC, WorkBook, Sheet, Cell, XTrigger } from '../index'
import SubTest from './subtest'
import FileSaver from 'file-saver'

class HocTest extends Component {
  render () {
   return (<div>
            <Sheet name='hoooo'>
            <SubTest cellRef='C9' content='feesh'/>
            <SubTest cellRef='C10' content='feesh'/>
            </Sheet>
            <Sheet name='boooo'>
            <SubTest cellRef='C9' content='foossh'/>
            <SubTest cellRef='C10' content='foosh'/>
            </Sheet>
            </div>)
  }
}

const handleXLSX = (blob) => {
          console.log(blob)
          FileSaver.saveAs(blob, 'formulae.xlsx')
        }

export default WorkBookHOC(HocTest, {render: false, debug: false, generate: true, callback: handleXLSX})
