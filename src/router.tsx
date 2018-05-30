import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { routerRedux, Switch } from 'dva/router';
import * as React from 'react';
import { getRouterData } from './common/router';
import { authority } from './utils/authority';
import Authorized from './utils/Authorized';

// 样式
const styles = require('./static/index.less');

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute }: any = Authorized;

(dynamic as any).setDefaultLoadingComponent(() => {
  return <Spin className={styles.globalSpin} />;
});

// 获取准入权限的数组
const getAuthority = (obj: any) => {
  const result = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const { value } = obj[key];
      result.push(value);
    }
  }
  // console.log(result, 'result');
  return result;
};

function RouterConfig({ history, app }: any): React.ReactNode {
  const routerData = getRouterData(app);
  const components = {
    UserLayout: routerData['/user'].component,
    BasicLayout: routerData['/'].component,
  };
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            path="/user"
            render={((props: any) => <components.UserLayout {...props} />) as React.ReactNode}
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            render={((props: any) => <components.BasicLayout {...props} />) as React.ReactNode}
            authority={getAuthority(authority)}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
