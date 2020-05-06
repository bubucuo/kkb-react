import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 开课吧全栈学习"
    links={[
      {
        key: 'kkb',
        title: '开课吧',
        href: 'https://www.kaikeba.com/',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/bubucuo/kkb-react',
        blankTarget: true,
      },
    ]}
  />
);
