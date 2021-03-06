/// <reference types="react" />
import * as React from 'react';

export interface IDetailProps {
  data?: any[];
  sort?: string;
  form?: any;
  filterData?: any;
  resetData?: any;
  changeCity?: any;
  clickMe?: any;
  hideDatePicker?: boolean;
  showSelectCity?: boolean;
  loading?: boolean;
}

export interface IDetailStates {
  [propName: string]: any;
}

export interface IDetailItem {}
