import React, {Component} from "react";

// hoc 是个函数，参数为组件, 返回一个组件

function Child(props) {
  return <div className="green">child -{props.name}</div>;
}

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

const Foo = foo(foo(foo(Child)));

@foo
@foo
@foo
@foo
class FuncChild extends Component {
  render() {
    return <div className="green">child -{this.props.name}</div>;
  }
}

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo name={"Foo"} />
        <FuncChild name="FuncChild" />
      </div>
    );
  }
}
