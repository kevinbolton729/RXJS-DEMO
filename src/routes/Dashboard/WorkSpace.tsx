import { Avatar } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import * as React from 'react';
// 组件
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// 常量
import { ROLE_NAME, URL_PREFIX } from '../../utils/consts';
// 声明
import { IWorkItems, IWorkProps, IWorkStates } from './';
// 样式
const styles = require('./WorkSpace.less');

@connect(({ workspace, user }: any) => ({
  currentUser: user.currentUser,
}))
class WorkSpace extends React.PureComponent<IWorkProps, IWorkStates> implements IWorkItems {
  getShowDate = () => {
    enum formats {
      Daybreak = '凌晨',
      Morning = '早上',
      Midday = '中午',
      Afternoon = '下午',
      Night = '晚上',
    }
    const now = moment();
    const hour = now.hour();
    let i = 'Daybreak';

    if (hour >= 7 && hour <= 11) i = 'Morning';
    if (hour >= 12 && hour <= 13) i = 'Midday';
    if (hour >= 14 && hour <= 18) i = 'Afternoon';
    if (hour >= 19 && hour <= 23) i = 'Night';

    return `${formats[i]}好`;
  };

  render() {
    const { currentUser } = this.props;
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src={currentUser.portrait && `${URL_PREFIX}${currentUser.portrait}`}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            {`${this.getShowDate()}！${currentUser.nickname}，祝您开心每一天！`}
          </div>
          <div>{ROLE_NAME}</div>
        </div>
      </div>
    );

    return (
      <div>
        <PageHeaderLayout content={pageHeaderContent} />
        <div style={{ marginTop: '24px' }}>此处显示WorkSpace内容...</div>
      </div>
    );
  }
}

export default WorkSpace;
