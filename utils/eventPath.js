const eventPath = (evt) => {
  const path = (evt.composedPath && evt.composedPath()) || evt.path;
  const target = evt.target;

  if (path != null) {
    // Safari doesn't include Window, but it should.
    return !path.includes(window) ? path.concat(window) : path;
  }

  if (target === window) {
    return [window];
  }

  function getParents(node, memo) {
    memo = memo || [];
    const parentNode = node.parentNode;

    if (!parentNode) {
      return memo;
    } else {
      return getParents(parentNode, memo.concat(parentNode));
    }
  }

  return [target].concat(getParents(target), window);
};

export default eventPath;
