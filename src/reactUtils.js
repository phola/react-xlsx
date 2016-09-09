import React from 'react';

export const deepFilterByComponentType = (children, type, results = []) => {
  React.Children.forEach(children, child => {
    if (child) {
      if (child.type === type) {
        results.push(child)
      }
      if (child.props && child.props.children) {
        deepFilterByComponentType(child.props.children, type, results)
      }
    }
  })
  return results
}

export const deepFilterByType = (children, type, results = []) => {
  React.Children.forEach(children, child => {
    if (child) {
      if (typeof child === type) {
        results.push(child)
      }
      if (child.props && child.props.children) {
        deepFilterByType(child.props.children, type, results)
      }
    }
  })
  return results
}
