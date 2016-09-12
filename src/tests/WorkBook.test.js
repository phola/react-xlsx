import React from 'react';
import { WorkBook } from '../index';
import { simple, big } from '../instances'
import renderer from 'react-test-renderer';

console.error = jest.genMockFn();

it('simple renders', () => {
  const jsx = simple()
  const component = renderer.create(
    jsx
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('throws prop type error if has no cells', () => {
  const jsx = simple()
  const component = renderer.create(
    <WorkBook><div>ts</div></WorkBook>
  );
let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // Assert Results

      expect(console.error).toBeCalled();
      expect(console.error.mock.calls.length).toBeGreaterThan(0);
      expect(console.error.mock.calls[0][0]).toContain('Cell');

});

it('big renders', () => {
  const jsx = big()
  const component = renderer.create(
    jsx
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
