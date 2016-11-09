import React from 'react';

export const recursiveCloneChildrenAddPropstoType = (children, type, addProp) => {
        return React.Children.map(children, child => {
            var childProps = {}
            if (React.isValidElement(child) && child.props && child.type && (child.type.name === type)) {
                childProps = Object.assign({}, child.props, addProp)
            }
            if (child && child.props) {
                childProps.children = recursiveCloneChildrenAddPropstoType(child.props.children, type, addProp)
                return React.cloneElement(child, childProps)
            }
            return child
        })
}

export const deepFilterByComponentType = (children, type, results = []) => {
  React.Children.forEach(children, child => {
    if (child && child.type) {
      if (child.type.name === type) {
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

export function kindOf(node) {
  if(node === null || node === void 0 || typeof node === 'boolean') {
    return 'Empty';
  }
  if(typeof node === 'string' || typeof node === 'number') {
    return 'Text';
  }
  if(Array.isArray(node)) {
    return 'Fragment';
  }
  const { type } = node;
  if(typeof type === 'string') {
    return 'DOMElement';
  }
  return 'ComponentElement';
}

export function defaultTraverse(path) {
  const kind = kindOf(path.node);
  if(kind === 'Empty') {
    return path.node;
  }
  if(kind === 'Text') {
    return path.node;
  }
  if(kind === 'Fragment') {
    return path.node.map(path.traverse);
  }
  return React.cloneElement(
    path.node,
    path.node.props,
    ...path.traverseChildren()
  );
}

export function traverse(node, visitor) {
  const {
    Empty = defaultTraverse,
    Text = defaultTraverse,
    Fragment = defaultTraverse,
    DOMElement = defaultTraverse,
    ComponentElement = defaultTraverse,
  } = visitor;
  const path = {
    node,
    kindOf,
    defaultTraverse() {
      return defaultTraverse(path);
    },
    traverse(childNode, childVisitor = visitor) {
      return traverse(childNode, childVisitor);
    },
    traverseChildren(childVisitor = visitor) {
      return React.Children.toArray(path.node.props.children).map(
        (childNode) => path.traverse(childNode, childVisitor)
      );
    },
    visitor,
  };
  if(node === null || node === void 0 || typeof node === 'boolean') {
    return Empty(path); // eslint-disable-line new-cap
  }
  if(typeof node === 'string' || typeof node === 'number') {
    return Text(path); // eslint-disable-line new-cap
  }
  if(Array.isArray(node)) {
    return Fragment(path); // eslint-disable-line new-cap
  }
  const { type } = node;
  if(typeof type === 'string') {
    return DOMElement(path); // eslint-disable-line new-cap
  }
  return ComponentElement(path); // eslint-disable-line new-cap
}

export function transformComponentsInNode(node, transformComponent) {
  return traverse(node, {
    ComponentElement(path) {
      const { type, props } = path.node;
      return React.createElement(transformComponent(type), props);
    },
  });
}

const transformComponentsMemo = new WeakMap();
export default function transformComponents(transformComponent) {
  if(!transformComponentsMemo.has(transformComponent)) {
    transformComponentsMemo.set(transformComponent, new WeakMap());
  }
  const transformComponentMemo = transformComponentsMemo.get(transformComponent);
  return (type) => {
    if(typeof type === 'string') {
      return type;
    }
    if(!transformComponentMemo.has(type)) {
      if(React.isValidElement(type)) {
        transformComponentMemo.set(
          type,
          React.createElement(transformComponents(transformComponent)(() => type))
        );
      }
      else {
        transformComponentMemo.set(
          type,
          transformComponent(
            wrapRender(
              (node) => transformComponentsInNode(
                node,
                (childType) => transformComponents(transformComponent)(childType)
              ),
            )(type),
          ),
        );
      }
    }
    return transformComponentMemo.get(type);
  };
}
