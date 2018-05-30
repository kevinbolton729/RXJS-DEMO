import React from 'react';
import { Icon, message as openMessage } from 'antd';
import { fetchDuty } from '@/services/api';
import { parseNewResponse } from '@/utils/parse';
// 常量
import { SERVICE_INFO, API_DATA_ERROR } from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    globalConfirmLoading: false,
    notices: [],
    copyright: (
      <div>
        Copyright <Icon type="copyright" /> {SERVICE_INFO}
      </div>
    ),
    sitetypes: [],
    channeltypes: [],
    // 当前站点 默认：'59607e3c682e090ca074ecfd'
    currentSiteid: '59607e3c682e090ca074ecfd',
    // 责任部门（或责任人）
    dutyList: [],
  },

  effects: {
    // 获取责任部门（或责任人）
    *fetchDuty(_, { call, put }) {
      const response = yield call(fetchDuty);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeDutyList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    changeConfirmLoading(state, { payload }) {
      return {
        ...state,
        globalConfirmLoading: payload,
      };
    },
    getSiteType(state, { payload }) {
      return {
        ...state,
        sitetypes: payload,
      };
    },
    changeDutyList(state, { payload }) {
      return {
        ...state,
        dutyList: payload,
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
