import React, { Component } from "react";
import { connect } from "dva";
import { Table } from "antd";
import { Link } from "dva/router";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "住址",
    dataIndex: "city",
    key: "city"
  }
];

@connect(state => ({ state, example: state.example }), {
  getProductData: payload => ({ type: "example/getProductData", payload })
})
class ExamplePage extends Component {
  dataSearch = () => {
    // 异步获取数据
    this.props.getProductData();
  };
  render() {
    console.log("ExamplePage porps", this.props); //sy-log
    const { data } = this.props.example;
    return (
      <div>
        <h3>ExamplePage</h3>
        <button onClick={this.dataSearch}>search</button>
        <Table columns={columns} dataSource={data} rowKey="id" />
        <Link to="/user"> go user</Link>
      </div>
    );
  }
}
export default ExamplePage;
