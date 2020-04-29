import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Input, Form, Button, Table } from 'antd';
import { connect } from 'umi';

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

class Channel extends Component {
  componentDidMount() {
    this.props.getMoreData({ name: '' });
  }
  onFinish = values => {
    console.log('onFinish', values); //sy-log
    this.props.getMoreData(values);
  };
  onFinishFailed = () => {
    console.log('onFinishFailed'); //sy-log
  };
  render() {
    const { data } = this.props.channel;
    console.log('channel', this.props); //sy-log
    return (
      <PageHeaderWrapper>
        <Card>
          <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <Table columns={columns} dataSource={data} rowKey="id" />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ channel }) => ({ channel }), {
  getMoreData: values => ({ type: 'channel/getMoreData', payload: values }),
})(Channel);
