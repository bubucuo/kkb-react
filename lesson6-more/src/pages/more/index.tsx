import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import { getChannelData, queryRule } from './service';

interface FormProps {
  name?: string;
  pageSize: number;
  current: number;
  total: number;
}

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

export default () => {
  // const (pagination)
  return (
    <PageHeaderWrapper>
      <ProTable
        rowKey="id"
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 10,
        }}
        request={params => {
          console.log('params', params); //sy-log
          return getChannelData(params);
        }}
      />

      <Card>
        <Link to="/product/123">产品123</Link>
      </Card>
    </PageHeaderWrapper>
  );
};
