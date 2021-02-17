import {TEXT} from "./const";

function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  // key 、ref 先不考虑
  const props = {
    ...config,
    children: children.map(child =>
      typeof child === "object" ? child : createTextNode(child)
    )
  };

  return {
    type,
    props
  };
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {children: [], nodeValue: text}
  };
}

export default {createElement};
