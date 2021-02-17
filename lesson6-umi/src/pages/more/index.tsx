import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Card, Table } from 'antd';
import {getProductData} from '../../services/product.js';
import { connect } from 'umi';
import styles from './index.less';

import ProTable from '@ant-design/pro-table';

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
    // this.props.getProductData({ name: '' });
  }

  // 成功才会执行这个函数
  onFinish = values => {
    console.log('values', values); // sy-log
    // this.props.getMoreDataBySearch(values);
    // this.props.getProductData(values);
  };

  // 失败才会执行这个函数
  onFinishFailed = err => {
    console.log('err', err); // sy-log
  };

  render() {
    // const { data } = this.props.more;
    // const {getProductData} = this.props;
    return (
      // <PageHeaderWrapper className={styles.more}>
      //   <Card>
      //     <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
      //       <Form.Item
      //         label="姓名"
      //         name="name"
      //         rules={[{ required: true, message: '请输入姓名' }]}
      //       >
      //         <Input placeholder="请输入姓名" />
      //       </Form.Item>
      //       <Form.Item>
      //         <Button type="primary" htmlType="submit">
      //           查询
      //         </Button>
      //       </Form.Item>
      //     </Form>
      //   </Card>

      //   <Card>
      //     <Table columns={columns} dataSource={data} rowKey="id" />
      //   </Card>
      // </PageHeaderWrapper>


      <div>
        {/* 暗号：双十一打骨折 zhidl */}
        <ProTable
          headerTitle="表格"
          rowKey="id"
          columns={columns}
          request={(params) => (
            getProductData(params).then(value => {
              console.log(params, value.data);
              return value.data;
              // return {
              //   data: [
              //     {id:0, name: '1', age: 2, city: 'bj'}
              //   ]
              // }
            })
          )
          
        }
        >

        </ProTable>
      </div>
      
    );
  }
}

export default connect(
  // mapStateToProps
  ({ more }) => ({ more }),
  // mapDispatchToProps
  // {
    // getProductData: values => ({
    //   type: 'more/getProductData',
    //   payload: values,
    // }),
    // getMoreDataBySearch: values => ({
    //   type: 'more/getMoreDataBySearch',
    //   payload: values,
    // }),
  // },
)(More);
