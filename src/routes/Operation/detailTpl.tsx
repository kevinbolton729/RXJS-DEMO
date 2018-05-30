import { Button, Cascader, Col, Divider, Form, Input, Radio, Row } from 'antd';
import * as React from 'react';
// 常量
import { BTN_CANCEL, BTN_CLOSE, BTN_CONFIG, BTN_RESET, BTN_SAVE } from '../../utils/consts';
// 方法
import { getCityOptions, unixFormatter } from '../../utils/fns';
// help工具
import { covertCity, formatGetMethod, formatSync, getCitys, methodStats } from '../../utils/help';
// 声明
// import {} from './';
// 样式
// const styles = require('./');
// UI
const { TextArea }: any = Input;

// 是否显示配置按钮
const isConfig = (opts: any) => opts.isConfig;
// 是否是配置编辑状态
const isEditConfig = (opts: any) => opts.isEditConfig;

// FormItem 样式
const itemStyle = {
  // labelCol: { span: 10 },
  // wrapperCol: { span: 14 },
};
// 栅格: Col设置
const colQuery = {
  sm: 24,
  md: 8,
};

// 获取Radio中采集方式的ReactNode
const passMethod = () => {
  const result = [];
  for (const key in methodStats) {
    if (methodStats.hasOwnProperty(key)) {
      result.push({ label: methodStats[key].label, value: key });
    }
  }
  return result;
};

// 获取省份/城市级联菜单的项
const cityOptions = getCityOptions();
// 级联菜单: 搜索
const filter: any = (inputValue: string, path: string[]) =>
  path.some((option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

export default (data: any, fn: any, opts: any) => {
  const isData = data.length ? true : false;
  // console.log(data, 'selectedRecord');

  // 数据 duty
  const companyData = {
    sysName: isData ? data[0].detail.sysName : '',
    sysVersion: isData ? data[0].detail.sysVersion : '',
    getMethod: isData ? formatGetMethod(data[0].detail.getMethod) : '',
    getDataAt: isData ? unixFormatter(data[0].detail.getDataAt) : '',
    ip: isData ? data[0].detail.ip : '',
    port: isData ? data[0].detail.port : '',
    mac: isData ? data[0].detail.mac : '',
    sqlVersion: isData ? data[0].detail.sqlVersion : '',
    sync: isData ? formatSync(data[0].detail.sync) : '',
    readWrither: isData ? data[0].detail.readWrither : '',
    otherDevices: isData ? data[0].detail.otherDevices : '',
    dllVersion: isData ? data[0].detail.dllVersion : '',
    city: isData ? data[0].city : '',
    company: isData ? data[0].company : '',
    companyCode: isData ? data[0].companyCode : '',
    description: isData ? data[0].description : '',
  };

  const getFieldDecorator = opts.form && opts.form.getFieldDecorator;
  const noEditSys = isEditConfig(opts) || [
    <div key="title" className="hangTitle">
      <p>系统详细：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <span>系统名称 / 版本号：</span>
          <span>{`${companyData.sysName} / ${companyData.sysVersion}`}</span>
        </Col>
        <Col {...colQuery}>
          <span>采集方式：</span>
          <span>{companyData.getMethod}</span>
        </Col>
        <Col {...colQuery}>
          <span>采集数据时间：</span>
          <span>{companyData.getDataAt}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <span>IP地址/端口号：</span>
          <span>{`${companyData.ip} [${companyData.port}]`}</span>
        </Col>
        <Col {...colQuery}>
          <span>MAC地址：</span>
          <span>{companyData.mac}</span>
        </Col>
        <Col {...colQuery}>
          <span>数据库版本：</span>
          <span>{companyData.sqlVersion}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <span>数据库时间是否与服务器时间同步：</span>
          <span>{companyData.sync}</span>
        </Col>
        <Col {...colQuery}>
          <span>读写器/其他设备型号：</span>
          <span>{`${companyData.readWrither} / ${companyData.otherDevices}`}</span>
        </Col>
        <Col {...colQuery}>
          <span>DLL文件版本：</span>
          <span>{companyData.dllVersion}</span>
        </Col>
      </Row>
    </div>,
  ];
  const noEditCompany = isEditConfig(opts) || [
    <Divider key="divider" />,
    <div key="title" className="hangTitle">
      <p>{opts.sortGroup[opts.modalSort]}：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <span>省份/城市：</span>
          <span>{getCitys(companyData.city)}</span>
        </Col>
        <Col {...colQuery}>
          <span>燃气公司：</span>
          <span>{companyData.company}</span>
        </Col>
        <Col {...colQuery}>
          <span>公司编号：</span>
          <span>{companyData.companyCode}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <span>备注说明：</span>
          <span>{companyData.description}</span>
        </Col>
      </Row>
    </div>,
  ];
  const saveSys = [
    <div key="title" className="hangTitle">
      <p>系统详细：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="系统名称：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('sysname', {
                initialValue: companyData.sysName,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="版本号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('version', {
                initialValue: companyData.sysVersion,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="采集方式：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('method', {
                initialValue: isData ? `${data[0].detail.getMethod}` : '',
              })(<Radio.Group options={passMethod()} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        {/* <Col {...colQuery}>
          <Form.Item label="采集数据时间：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('updatetime', {
                initialValue: companyData.getDataAt,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col> */}
        <Col {...colQuery}>
          <Form.Item label="IP地址：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('ip', {
                initialValue: companyData.ip,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="端口号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('port', {
                initialValue: companyData.port,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="MAC地址：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('mac', {
                initialValue: companyData.mac,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="数据库版本：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('sqlversion', {
                initialValue: companyData.sqlVersion,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="读写器：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('read', {
                initialValue: companyData.readWrither,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="其他设备型号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('other', {
                initialValue: companyData.otherDevices,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        {/* <Col {...colQuery}>
          <Form.Item label="数据库时间是否与服务器时间同步：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('sync', {
                initialValue: companyData.sync,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col> */}
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="DLL文件版本：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('dllverison', {
                initialValue: companyData.dllVersion,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </div>,
  ];
  const saveCompany = [
    <Divider key="divider" />,
    <div key="title" className="hangTitle">
      <p>{opts.sortGroup[opts.modalSort]}：</p>
    </div>,
    <div key="subtitle" className="cascaderSubTitle">
      <Row gutter={24}>
        <Col sm={24} md={4}>
          <Form.Item label="省份/城市：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('city', {
                initialValue: covertCity(companyData.city),
              })(
                <Cascader
                  placeholder="省份/城市"
                  size="large"
                  expandTrigger="hover"
                  notFoundContent="请输入正确的城市名"
                  style={{ width: '100%' }}
                  options={cityOptions}
                  showSearch={{ filter }}
                  onChange={fn.changeCity}
                />
              )}
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item label="燃气公司：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('company', {
                initialValue: companyData.company,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col sm={24} md={16}>
          <Form.Item label="备注说明：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('des', {
                initialValue: companyData.description,
              })(<TextArea size="large" rows={4} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        {/* <Col {...colQuery}>
          <Form.Item label="公司编号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('companyCode', {
                initialValue: companyData.companyCode,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col> */}
      </Row>
    </div>,
  ];
  const handler = isEditConfig(opts) ? (
    <Form key="editConfigForm" onSubmit={fn.onSubmit.bind(null, data)}>
      {saveSys}
      {saveCompany}
      <div style={{ marginTop: '48px' }}>
        <Button loading={opts.confirmLoading} key="save" type="primary" htmlType="submit">
          {BTN_SAVE}
        </Button>
        <Divider type="vertical" />
        <Button onClick={fn.onReset}>{BTN_RESET}</Button>
        <Divider type="vertical" />
        <Button onClick={fn.closeConfig}>{BTN_CANCEL}</Button>
      </div>
    </Form>
  ) : (
    <div key="handler" style={{ marginTop: '48px' }}>
      {isConfig(opts) && [
        <Button key="config" type="primary" onClick={fn.handlerConfig}>
          {BTN_CONFIG}
        </Button>,
        <Divider key="divider" type="vertical" />,
      ]}
      <Button onClick={fn.closeModal}>{BTN_CLOSE}</Button>
    </div>
  );
  const main = (
    <div key="main">
      {noEditSys}
      {noEditCompany}
    </div>
  );
  const nocontent = <div>什么都没有</div>;

  const content = {
    company: [main, handler],
  };

  return content[opts.modalSort] || nocontent;
};
