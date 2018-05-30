import { message as openMessage } from 'antd';
import { fetchCompanyConfig } from '@/services/api';
import { parseNewResponse } from '@/utils/parse';

export default {
  namespace: 'company',

  state: {
    companyList: [], // 燃气公司
  },

  effects: {
    // 更新配置
    *fetchConfig(_, { call }) {
      const response = yield call(fetchCompanyConfig);
      const { code, message } = yield call(parseNewResponse, response);

      if (code === 0) {
        yield openMessage.success(message);
      }
    },
  },

  reducers: {
    changeCompanyList(state, { payload }) {
      return {
        ...state,
        companyList: payload,
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
