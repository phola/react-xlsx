import React from 'react';
import WorkBook from '../WorkBook';
import { simple } from '../instances'
import renderer from 'react-test-renderer';

console.error = jest.genMockFn();

it('simple renders', () => {
  const jsx = simple()
  const component = renderer.create(
    jsx
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //
  // tree = tree.createWorkBook();
  // expect(tree).toMatchSnapshot();

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

  //
  // tree = tree.createWorkBook();
  // expect(tree).toMatchSnapshot();

});
