export default {
  namespace: "user",
  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      console.log("user subscriptions"); //sy-log
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: "save" });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
