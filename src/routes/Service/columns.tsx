import * as React from 'react';
// 方法
import { unixFormatter } from '../../utils/fns';
// help工具
import {
  formatAlarmType,
  formatDefaultStatus,
  formatExpress,
  formatOnLineStatus,
  formatScanMethod,
  showAction,
} from '../../utils/help';

// 客户服务监控
// Columns of Table
export const customCols = (fn: any) => {
  // 扩频表
  const spread = [
    {
      title: '表编号',
      dataIndex: 'spreadCode',
      key: 'spreadCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '扫频方式',
      dataIndex: 'scanMethod',
      key: 'scanMethod',
      render: (text: any) => formatScanMethod(text),
    },
    {
      title: '数据提取状态',
      dataIndex: 'extractStatus',
      key: 'extractStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'spread' });
      },
    },
  ];
  // 物联网表
  const nblot = [
    {
      title: '表编号',
      dataIndex: 'nblotCode',
      key: 'nblotCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '在线状态',
      dataIndex: 'onLineStatus',
      key: 'onLineStatus',
      render: (text: any) => formatOnLineStatus(text),
    },
    {
      title: '数据上传状态',
      dataIndex: 'uploadStatus',
      key: 'uploadStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return <div>{showAction({ fn, record, key: 'nblot' })}</div>;
      },
    },
  ];
  // 异常报警
  const unusual = [
    {
      title: '表编号',
      dataIndex: 'meterCode',
      key: 'meterCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '报警类型/报警次数',
      dataIndex: 'alarmType',
      key: 'alarmType',
      render: (text: any, record: any) => [
        formatAlarmType(record.alarmType),
        <span key="alarmNum">{`${record.alarmNum}`}</span>,
      ],
    },
    {
      title: '报警时间',
      dataIndex: 'alarmAt',
      key: 'alarmAt',
      render: (text: any) => <span>{unixFormatter(text)}</span>,
    },
    {
      title: '预警状态',
      dataIndex: 'alarmStatus',
      key: 'alarmStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'unusual' });
      },
    },
  ];
  // 集中器
  const concentrator = [
    {
      title: '编号',
      dataIndex: 'concentratorCode',
      key: 'concentratorCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '集中器在线状态',
      dataIndex: 'cardStatus',
      key: 'cardStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'concentrator' });
      },
    },
  ];
  // 发货记录
  const shipping = [
    {
      title: '表编号',
      dataIndex: 'meterCode',
      key: 'meterCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '快递公司/发货单号/发货时间',
      dataIndex: 'express',
      key: 'express',
      render: (text: any, record: any) => [
        formatExpress(record.express),
        <span key="orderId">{`${record.orderId} / ${unixFormatter(record.deliveryAt)}`}</span>,
      ],
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'shipping' });
      },
    },
  ];

  return { spread, nblot, unusual, concentrator, shipping };
};

// 业务数据监控的
// Columns of Table
export const dataMonitorCols = (fn: any) => {
  // 扩频表
  const spread = [
    {
      title: '表编号',
      dataIndex: 'spreadCode',
      key: 'spreadCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '扫频方式',
      dataIndex: 'scanMethod',
      key: 'scanMethod',
      render: (text: any) => formatScanMethod(text),
    },
    {
      title: '数据提取状态',
      dataIndex: 'extractStatus',
      key: 'extractStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'spread' });
      },
    },
  ];
  // 物联网表
  const nblot = [
    {
      title: '表编号',
      dataIndex: 'nblotCode',
      key: 'nblotCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '在线状态',
      dataIndex: 'onLineStatus',
      key: 'onLineStatus',
      render: (text: any) => formatOnLineStatus(text),
    },
    {
      title: '数据上传状态',
      dataIndex: 'uploadStatus',
      key: 'uploadStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'nblot' });
      },
    },
  ];
  // 集中器
  const concentrator = [
    {
      title: '编号',
      dataIndex: 'concentratorCode',
      key: 'concentratorCode',
      render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '集中器在线状态',
      dataIndex: 'cardStatus',
      key: 'cardStatus',
      width: 240,
      render: (text: any) => formatDefaultStatus(text),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'concentrator' });
      },
    },
  ];

  return { spread, nblot, concentrator };
};
