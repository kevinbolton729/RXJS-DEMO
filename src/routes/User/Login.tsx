import { Alert, Checkbox, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import * as React from 'react';
// 组件库
import Login from '../../components/Login';
// 声明
import { ILoginItems, ILoginProps, ILoginStates } from './';

// 样式
const styles = require('./Login.less');
// 组件
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }: any) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginComponent extends React.Component<ILoginProps, ILoginStates> implements ILoginItems {
  state = {
    type: 'account',
    autoLogin: true,
    mode: {
      isRegister: false,
      isMobile: false,
      isOther: false,
      isForget: false,
      isAuto: false,
    },
  };

  onTabChange = () => {
    const { type } = this.state;
    this.setState({ type });
  };

  handleSubmit = (err: any, values: any) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = (event: any) => {
    this.setState({
      autoLogin: event.target.checked,
    });
  };

  renderMessage = (content: string) => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon={true} />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type, mode } = this.state;
    const { isRegister, isMobile, isOther, isForget, isAuto } = mode;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="username" placeholder="账号" />
            <Password name="password" placeholder="密码" />
          </Tab>
          {isMobile && (
            <Tab key="mobile" tab="手机号登录">
              {login.status === 'error' &&
                login.type === 'mobile' &&
                !login.submitting &&
                this.renderMessage('验证码错误')}
              <Mobile name="mobile" />
              <Captcha name="captcha" />
            </Tab>
          )}
          <div>
            {isAuto && (
              <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
                自动登录
              </Checkbox>
            )}
            {isForget && (
              <a style={{ float: 'right' }} href="">
                忘记密码
              </a>
            )}
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className="other">
            {isOther && (
              <span>
                其他登录方式
                <Icon className="icon" type="alipay-circle" />
                <Icon className="icon" type="taobao-circle" />
                <Icon className="icon" type="weibo-circle" />
              </span>
            )}
            {isRegister && (
              <Link className="register" to="/user/register">
                注册账户
              </Link>
            )}
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginComponent;
