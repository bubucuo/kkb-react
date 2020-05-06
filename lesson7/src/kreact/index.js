import {TEXT} from "./const";

function createElement(type, props, ...children) {
  if (props) {
    delete props.__self;
    delete props.__source;
  }

  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextNode(child)
      )
    }
  };
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement,
  version: "1"
};
