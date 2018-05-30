// import { message as openMessage } from 'antd';
// import {} from '@/services/api';
// import { parseResponse } from '@/utils/parse';
// 常量
// import { API_DOMAIN } from '@/utils/consts';
// 方法
// import { noToken } from '@/utils/fns';

export default {
  namespace: 'workspace',

  state: {
    loading: true,
  },

  effects: {},

  reducers: {
    changeLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
  },
};
