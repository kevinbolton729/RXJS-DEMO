import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];
type CurrentUser = IProps['currentUser'];
type Dispatch = IProps['dispatch'];

export interface IWorkProps {
  loading: boolean;
  dispatch: Dispatch;
  currentUser: CurrentUser;
  lists: any;
}

export interface IWorkStates {}

export interface IWorkItems {
  getShowDate: ReturnString;
}
