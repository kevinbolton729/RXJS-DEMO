import { message as openMessage } from 'antd';
import { fetchDutyConfig } from '@/services/api';
import { parseNewResponse } from '@/utils/parse';

export default {
  namespace: 'datamonitor',

  state: {
    spreadList: [], // 扩频表
    concentratorList: [], // 集中器
    nblotList: [], // 物联网表
  },

  effects: {
    // 更新配置
    *fetchConfig(_, { call }) {
      const response = yield call(fetchDutyConfig);
      const { code, message } = yield call(parseNewResponse, response);

      if (code === 0) {
        yield openMessage.success(message);
      }
    },
  },

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
    changeNblotList(state, { payload }) {
      return {
        ...state,
        nblotList: payload,
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
