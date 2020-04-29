import { getChannelData, getChannelDataBySearch } from '@/services/more';

const model = {
  namespace: 'login',
  state: { isLogin: false },
  effects: {
    *login(action, { call, put }) {
      yield put({ type: 'result', payload: { isLogin: true } });
    },
  },
  reducers: {
    result(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default model;
