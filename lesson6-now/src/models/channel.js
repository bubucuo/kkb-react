import { getChannelData, getChannelDataBySearch } from '@/services/more';

const model = {
  namespace: 'channel',
  state: { data: [] },
  effects: {
    *getMoreData(action, { call, put }) {
      const res = yield call(getChannelData, action.payload);
      yield put({
        type: 'moreData',
        payload: res,
      });
    },
  },
  reducers: {
    moreData(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};

export default model;
