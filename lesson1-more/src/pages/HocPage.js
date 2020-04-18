import React, {Component} from "react";

// 是个函数,参数为组件, 返回值为新组件

function Child(props) {
  return <div>child-{props.name}</div>;
}

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

const Foo = foo(foo(Child));

@foo
@foo
class ClassChild extends Component {
  render() {
    return <div>child-{this.props.name}</div>;
  }
}

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo name="child" />
        <ClassChild name="ClassChild" />
      </div>
    );
  }
}
