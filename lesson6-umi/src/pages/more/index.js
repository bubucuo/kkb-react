import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Card, Table } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

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

// UI层和数据层分开
class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProductData({ name: '' });
  }

  // 成功才会执行这个函数
  onFinish = values => {
    console.log('values', values); // sy-log
    // this.props.getMoreDataBySearch(values);
    this.props.getProductData(values);
  };

  // 失败才会执行这个函数
  onFinishFailed = err => {
    console.log('err', err); // sy-log
  };

  render() {
    const { data } = this.props.more;
    return (
      <PageHeaderWrapper className={styles.more}>
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

export default connect(
  // mapStateToProps
  ({ more }) => ({ more }),
  // mapDispatchToProps
  {
    getProductData: values => ({
      type: 'more/getProductData',
      payload: values,
    }),
    // getMoreDataBySearch: values => ({
    //   type: 'more/getMoreDataBySearch',
    //   payload: values,
    // }),
  },
)(More);
