import { routerRedux } from 'dva/router';
import { message as openMessage } from 'antd';
import { fakeAccountLogin, accountLoginOut } from '@/services/api';
import { setAuthority, authority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { parseNewResponse } from '@/utils/parse';
// import qs from 'qs';
// 常量
import { MESSAGE_LOGINON_SUCCESS, PAGELOGIN } from '@/utils/consts';
// 方法
import {} from '@/utils/fns';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const { code, message, data } = yield call(parseNewResponse, response);
      // Login successfully
      if (code === 0) {
        const currentAuthority = yield authority[data[0].role].value;
        // yield console.log(currentAuthority, 'currentAuthority');
        // 获取当前登录用户权限并保持权限值
        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...response,
            currentAuthority,
          },
        });
        yield reloadAuthorized();
        yield openMessage.success(MESSAGE_LOGINON_SUCCESS);
        yield put(routerRedux.push('/'));
      } else {
        yield openMessage.error(message);
      }
    },
    *logout(_, { put, call, select }) {
      const response = yield call(accountLoginOut);
      const { code, message } = yield call(parseNewResponse, response);
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        if (code === 0) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: false,
              currentAuthority: 'guest',
            },
          });
          reloadAuthorized();
          // yield openMessage.success(MESSAGE_LOGINOUT_SUCCESS);
          yield openMessage.success(message);
          yield put(routerRedux.push(PAGELOGIN));
        } else {
          yield openMessage.error(message);
        }
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
