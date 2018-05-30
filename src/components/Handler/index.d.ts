/// <reference types="react" />
import * as React from 'react';

export interface IDetailProps {
  sort?: string;
  form?: any;
  filterData?: any;
  resetData?: any;
  changeCity?: any;
  hideDatePicker?: boolean;
  showSelectCity?: boolean;
}

export interface IDetailStates {
  [propName: string]: any;
}

export interface IDetailItem {}
