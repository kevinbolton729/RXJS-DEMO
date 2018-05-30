import * as React from 'react';
import { IProps, IReturnTypes } from '../../global';

type ReturnString = IReturnTypes['string'];
type ReturnVoid = IReturnTypes['void'];

export interface ICompanyProps {
  confirmLoading: boolean;
  companyList: any[];
  form: any;
}

export interface ICompanyStates {
  loading: boolean;
  visible: boolean;
  isEditConfig: boolean;
  isClick: boolean;
  modalSort: string;
  selectedRecord: any[];
}

export interface ICompanyItems {}
