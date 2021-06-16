import {Component} from "react";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    // this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount0", this); //sy-log
    this.test();
  }

  test() {
    console.log("test", this); //sy-log
  }

  handle() {
    console.log("this", this); //sy-log
    this.setState({count: this.state.count + 1});
  }
  render() {
    const {count} = this.state;
    return (
      <div>
        <h3>Demo</h3>
        <button onClick={this.handle}>{count}</button>
      </div>
    );
  }
}
export default Demo;
