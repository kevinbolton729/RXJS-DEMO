/*
 * @Author: Kevin Bolton
 * @Date: 2017-12-27 12:55:09
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-20 13:32:55
 */
import { Icon, Spin } from 'antd';
import * as React from 'react';
// 声明
import { LoadingProps as Props } from './loading';

export default (props: Props) => {
  const { size = 'small', style = {}, type = 'loading', center = false, children } = props;
  const newStyle = Object.assign({}, { fontSize: 24 }, style);
  const newLoading = <Icon type="loading" style={newStyle} spin={true} />;

  return type === 'default' ? (
    <Spin size={size} style={newStyle}>
      {children || (center && <i />)}
    </Spin>
  ) : (
    <Spin indicator={newLoading}>{children || (center && <i />)}</Spin>
  );
};
