import React, {Component} from "react";

// hoc
// 是个函数, 参数是组件,返回值是新组件

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

function Child(props) {
  return <div>chiild- {props.name}</div>;
}

const Foo = foo(foo(Child));

@foo
@foo
class ClassChild extends Component {
  render() {
    return <div>chiild- {this.props.name}</div>;
  }
}

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo name="Foo" />
        <ClassChild name="Foo2" />
      </div>
    );
  }
}
