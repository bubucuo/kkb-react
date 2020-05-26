import React, {Component} from "react";

// hoc
// 是个函数,参数是组件，返回值也是组件

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

// function Child(props) {
//   return <div className="border">Child-{props.name}</div>;
// }

@foo
@foo
class Child extends Component {
  render() {
    return <div className="border">Child-{this.props.name}</div>;
  }
}

// const Foo = foo(foo(Child));

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Child name="我是参数" />
      </div>
    );
  }
}
