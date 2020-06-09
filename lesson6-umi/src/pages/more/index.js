import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'umi';

// pro-table

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

@connect(({ more }) => ({ more }), {
  getMoreData: () => ({ type: 'more/getProductData' }),
})
class More extends Component {
  componentDidMount() {
    this.props.getMoreData();
  }

  render() {
    console.log('state', this.props); //sy-log
    const { more } = this.props;
    const { data } = more;
    return (
      <div>
        <h3>index</h3>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    );
  }
}
export default More;
