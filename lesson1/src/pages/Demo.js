import {Component} from "react";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }
  render() {
    const {name} = this.state;
    return (
      <div>
        <h3>Demo</h3>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            this.setState({name: e.target.value});
          }}
        />
      </div>
    );
  }
}
