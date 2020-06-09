import { getProductData } from "../services/product";

export default {
  namespace: "example",

  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   yield put({ type: "save" });
    // },
    *getProductData({ payload }, { call, put }) {
      //
      const res = yield call(getProductData, payload);
      yield put({ type: "productData", payload: res.data });
    }
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // }
    productData(state, action) {
      return { ...state, data: action.payload.data };
    }
  }
};
