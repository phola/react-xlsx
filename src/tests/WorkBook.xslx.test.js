import React from 'react'
import WorkBook from '../WorkBook'
import { simple } from '../instances'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

it('generates simple workbook object', () => {
  const jsx = simple()
  const component = TestUtils.renderIntoDocument(
    jsx
  )
  let tree = component.createWorkBook()
  expect(tree).toMatchSnapshot()

  tree = { blobsize: component.generateXLSX(tree).size }
  expect(tree).toMatchSnapshot()
})
