import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type Dispatch = IProps['dispatch'];
type ReturnVoid = IReturnTypes['void'];

export interface ILoginProps {
  dispatch: Dispatch;
  login: any;
  submitting: boolean;
}
export interface ILoginStates {
  type: string;
  autoLogin: boolean;
  mode: {
    isRegister: boolean;
    isMobile: boolean;
    isOther: boolean;
    isForget: boolean;
    isAuto: boolean;
  };
}

export interface ILoginItems {
  onTabChange: ReturnVoid;
  handleSubmit: (err: any, values: any) => void;
  changeAutoLogin: (event: any) => void;
  renderMessage: (content: string) => React.ReactNode;
}
