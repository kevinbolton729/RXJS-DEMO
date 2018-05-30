import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];
type Dispatch = IProps['dispatch'];

export interface IBusinessProps {}

export interface IBusinessStates {}

export interface IBusinessItems {}

export interface ICustomProps {
  confirmLoading: boolean;
  dispatch: Dispatch;
  spreadList: any[];
  concentratorList: any[];
  shippingList: any[];
  nblotList: any[];
  nblotShippingList: any[];
  unusualSpreadList: any[];
  unusualNblotList: any[];
  dutyList: any[];
  form: any;
}

export interface ICustomStates {
  loading: boolean;
  visible: boolean;
  currentTab: string;
  currentRadio: string;
  currentTable: string;
  modalSort: string;
  selectedRecord: any[];
}

export interface ICustomItems {
  tabChange(key: string): void;
}

export interface IDataMonitorProps {
  confirmLoading: boolean;
  dispatch: Dispatch;
  spreadList: any[];
  concentratorList: any[];
  nblotList: any[];
  dutyList: any[];
  form: any;
}

export interface IDataMonitorStates {
  loading: boolean;
  visible: boolean;
  isEditConfig: boolean;
  isClick: boolean;
  currentTab: string;
  currentRadio: string;
  currentTable: string;
  modalSort: string;
  selectedRecord: any[];
}

export interface IDataMonitorItems {}

export interface IDetailProps {
  loading: boolean;
  dispatch: Dispatch;
  match: any;
}

export interface IDetailStates {
  currentTab: string;
  currentRadio: string;
  currentTable: string;
}

export interface IDetailItems {}
