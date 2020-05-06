import React, { useEffect } from 'react';
import { IRouteComponentProps, Link, connect, Dispatch } from 'umi';
import { UserModelState, ConnectState } from '@/models/connect';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import Footer from '@/components/Footer';
import Auth from '@/pages/Auth';

import { Result, Button } from 'antd';

interface LayoutProps extends IRouteComponentProps {
  user: UserModelState;
  dispatch: Dispatch;
}

export default connect(({ user }: ConnectState) => ({ user }))(
  (props: LayoutProps) => {
    const { user, dispatch, children, location } = props;

    useEffect(() => {
      // 获取menus数据
      dispatch({
        type: 'user/fetchCurrent',
      });
    }, []);

    const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
      console.log('menuList', menuList); //sy-log
      return menuList.map(item => {
        const localItem = {
          ...item,
          children: item.children ? menuDataRender(item.children) : [],
        };
        return localItem; //Authorized.check(item.authority, localItem, null) as MenuDataItem;
      });
    };

    return (
      <ProLayout
        title="开课吧"
        logo="https://img.kaikeba.com/web/kkb_index/img_index_logo.png"
        siderWidth={300}
        footerRender={Footer}
        menuDataRender={menuDataRender}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        {...props}
      >
        {/* menu组件 */}
        {/* <h1>全局layout</h1> */}
        <Auth user={user}>{children}</Auth>
      </ProLayout>
    );
  },
);
