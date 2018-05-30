import * as React from 'react';
// 方法
import { unixFormatter } from '../../utils/fns';
// help工具
import { formatDefaultStatus, formatGetMethod, showAction } from '../../utils/help';

// 燃气公司运营
// Columns of Table
export const companyCols = (fn: any) => {
  // 燃气公司
  const company = [
    {
      title: '燃气公司',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '系统名称/版本号',
      dataIndex: 'sysName',
      key: 'sysName',
      width: 200,
      render: (text: any, record: any) => [
        <span key="sysName">{record.detail.sysName}</span>,
        <span key="sysVersion">{` / ${record.detail.sysVersion}`}</span>,
      ],
    },
    {
      title: '采集方式',
      dataIndex: 'getMethod',
      key: 'getMethod',
      render: (text: any, record: any) => [
        formatGetMethod(record.detail.getMethod),
        <span key="getDataAt">{` ${unixFormatter(record.detail.getDataAt)}`}</span>,
      ],
    },
    {
      title: '运行状态',
      dataIndex: 'runStatus',
      key: 'runStatus',
      width: 120,
      render: (text: any, record: any) => formatDefaultStatus(record.detail.runStatus),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'company' });
      },
    },
  ];

  return { company };
};
