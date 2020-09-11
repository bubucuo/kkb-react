import {TEXT} from "./const";

function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  // ! 今天先不考虑key和ref

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

// 把文本节点变成对象的形式，方便统一简洁处理，源码当中没这样
function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {createElement};
