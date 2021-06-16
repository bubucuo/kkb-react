// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import ReactDOM, {useState} from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  const [count, setCount] = useState(0);

  // fiber.memoizedState->hook0->hook1->hook2

  return (
    <div className="border">
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        {count}
      </button>

      {count % 2 ? <div>omg</div> : <span>哈哈哈哈</span>}
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

// function FragmentComponent(props) {
//   return [1, 2].map((item) => (
//     <React.Fragment key={item}>
//       <li>111</li>
//       <li>222</li>
//     </React.Fragment>
//   ));
// }

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/" style={{color: "red"}}>
      kkb
    </a>
    <ClassComponent name="class" />
    <FunctionComponent name="function" />
    <ul>
      <>
        <h1>111</h1>
        <h1>222</h1>
      </>
    </ul>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
// console.log("vsersion", React.version); //sy-log

//原生标签
// 文本
// 类组件
// 函数组件
