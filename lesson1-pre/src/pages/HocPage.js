import React, {Component} from "react";

// hoc
// 是个函数,参数为组件,返回值也是组件
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

// const Foo = foo(foo(Child));

@foo
@foo
class Child extends Component {
  render() {
    return <div className="border">Child-{this.props.name}</div>;
  }
}

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo name="参数" /> */}
        <Child name="新参数" />
      </div>
    );
  }
}
