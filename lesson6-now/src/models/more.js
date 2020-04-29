import { getChannelData, getChannelDataBySearch } from '@/services/more';

const model = {
  namespace: 'more',
  state: { data: [], pageSize: 10, current: 1, data1: [] },
  effects: {
    *getMoreData(action, { call, put }) {
      const res = yield call(getChannelData, action.payload);
      // 更新数据
      yield put({ type: 'moreData', payload: res });
    },
    // *getMoreDataBySearch(action, { call, put }) {
    //   const res = yield call(getChannelDataBySearch, action.payload);
    //   // 更新数据
    //   yield put({ type: 'moreData', payload: res });
    // },
  },
  reducers: {
    moreData(state, { payload }) {
      // 返回一个新的state
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};

export default model;
