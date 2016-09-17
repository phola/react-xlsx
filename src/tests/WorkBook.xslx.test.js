import React from 'react'
import WorkBook from '../WorkBook'
import { simpleNoCallback } from '../instances'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

it('generates simple workbook object', () => {
  const jsx = simpleNoCallback()
  const component = TestUtils.renderIntoDocument(
    jsx
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree = { blobsize: component.toXLSX(tree).size }
  expect(tree).toMatchSnapshot()
})
