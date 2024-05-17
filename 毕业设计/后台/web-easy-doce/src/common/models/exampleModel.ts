export default {
  namespace: "example",
  state: {
    count: 0,
  },
  reducers: {
    save(state: any, { payload: { count } }: any) {
      return { ...state, count };
    },
  },
  effects: {
    *increment(action, { put, select }) {
      const count = yield select((state) => state.example.count);
      const newCount = count + 1;
      yield put({ type: "save", payload: { count: newCount } });
    },
    *decrement(action, { put, select }) {
      const count = yield select((state) => state.example.count);
      const newCount = count - 1;
      yield put({ type: "save", payload: { count: newCount } });
    },
  },
};
