import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import { IBusinessItems, IBusinessProps, IBusinessStates } from './';
// 样式

@connect()
class Business extends React.PureComponent<IBusinessProps, IBusinessStates>
  implements IBusinessItems {
  render() {
    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <span className="areaTop">此处显示Business内容...</span>
        </div>
      </div>
    );
  }
}

export default Business;
