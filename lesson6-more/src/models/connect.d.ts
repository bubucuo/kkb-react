import { DefaultRootState } from 'react-redux';
import { UserModelState } from './user';

export { UserModelState };

export interface ConnectState extends DefaultRootState {
  user: UserModelState;
}
