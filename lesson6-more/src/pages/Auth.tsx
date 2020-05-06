import React, { ReactNode } from 'react';
import {
  IRouteComponentProps,
  Location,
  useModel,
  useLocation,
  UserModelState,
  Link,
} from 'umi';
import { Result, Button } from 'antd';

interface AuthProps {
  user: any;
  children: ReactNode;
}

export default (props: AuthProps) => {
  const { user, children } = props;
  const location: Location = useLocation();
  let match: boolean = true;
  if (location.pathname === '/more') {
    match = user.currentUser.role === '__vip';
  }
  return match ? (
    children
  ) : (
    <Result
      status={403}
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to="/">Go home</Link>
        </Button>
      }
    />
  );
};
