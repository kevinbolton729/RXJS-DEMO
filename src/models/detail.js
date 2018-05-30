import { routerRedux } from 'dva/router';
// import { message as openMessage } from 'antd';
// import {} from '@/services/api';
// import { parseResponse } from '@/utils/parse';
// 常量
// import {} from '@/utils/consts';
// 方法
// import {} from '@/utils/fns';

export default {
  namespace: 'detail',

  state: {
    loading: false,
  },

  effects: {
    *goto({ payload }, { put }) {
      const { type, id } = yield payload;
      // yield console.log({ type, id }, 'payload');
      if (type === 0) yield put(routerRedux.push(`/profile/custom/${id}`));
      if (type === 1) yield put(routerRedux.push(`/profile/datamonitor/${id}`));
    },
  },

  reducers: {
    changeLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
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
