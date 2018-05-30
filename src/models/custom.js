export default {
  namespace: 'custom',

  state: {
    spreadList: [], // 扩频表
    concentratorList: [], // 集中器
    shippingList: [], // 扩频表>发货记录
    nblotList: [], // 物联网表
    nblotShippingList: [], // 物联网表>发货记录
    unusualSpreadList: [], // 异常报警>扩频表
    unusualNblotList: [], // 异常报警>物联网表
  },

  effects: {},

  reducers: {
    changeSpreadList(state, { payload }) {
      return {
        ...state,
        spreadList: payload,
      };
    },
    changeConcentratorList(state, { payload }) {
      return {
        ...state,
        concentratorList: payload,
      };
    },
    changeShippingList(state, { payload }) {
      return {
        ...state,
        shippingList: payload,
      };
    },
    changeNblotList(state, { payload }) {
      return {
        ...state,
        nblotList: payload,
      };
    },
    changeNblotShippingList(state, { payload }) {
      return {
        ...state,
        nblotShippingList: payload,
      };
    },
    changeUnusualSpreadList(state, { payload }) {
      return {
        ...state,
        unusualSpreadList: payload,
      };
    },

    changeUnusualNblotList(state, { payload }) {
      return {
        ...state,
        unusualNblotList: payload,
      };
    },
  },

  subscriptions: {
    // setup({ history }) {
    //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //   return history.listen(({ pathname, search }) => {
    //     if (typeof window.ga !== 'undefined') {
    //       window.ga('send', 'pageview', pathname + search);
    //     }
    //   });
    // },
  },
};
