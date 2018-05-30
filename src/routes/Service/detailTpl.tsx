import { Button, Col, Divider, Form, Input, Popover, Row, Steps } from 'antd';
import { enquireScreen } from 'enquire-js';
import * as React from 'react';
// 常量
import { BTN_CANCEL, BTN_CLOSE, BTN_CONFIG, BTN_RESET, BTN_SAVE } from '../../utils/consts';
// 方法
import { unixFormatter } from '../../utils/fns';
// help工具
import {
  formatAlarmType,
  formatBatteryStatus,
  formatDefaultStatus,
  formatPriceType,
  formatTapStatus,
} from '../../utils/help';
// 声明
// import {} from './';
// 样式
const styles = require('./');

// UI
const { Step } = Steps;
const customDot = (dot: React.ReactNode, { status, index }: { status: string; index: number }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

// 是否显示配置按钮
const isConfig = (opts: any) => opts.isConfig && opts.modalSort !== 'concentrator';
// 是否是配置编辑状态
const isEditConfig = (opts: any) => opts.isEditConfig;

// FormItem 样式
const itemStyle = {
  // labelCol: { span: 6 },
  // wrapperCol: { span: 18 },
};
// 栅格: Col设置
const colQuery = {
  sm: 24,
  md: 8,
};

// 根据屏幕分辨率获取Steps的显示方向
const getDirection = () => {
  let isMobile = false;
  enquireScreen((mobile: boolean) => {
    isMobile = mobile || false;
  });
  return isMobile ? 'vertical' : 'horizontal';
};

export default (data: any, fn: any, opts: any) => {
  const isData = data[0] ? true : false;
  const isDuty = isData && data[0].duty ? true : false;
  // 判断data以及data[0].duty是否有数据
  const isDutyData = () => isData && isDuty;
  // console.log(data[0], 'selectedRecord');
  // console.log(isData, 'isData');
  // console.log(isDuty, 'isDuty');

  // 数据 duty
  const dutyData = {
    department: isDutyData() ? data[0].duty[0].department : '',
    name: isDutyData() ? data[0].duty[0].name : '',
    phone: isDutyData() ? data[0].duty[0].phone : '',
    tel: isDutyData() ? data[0].duty[0].tel : '',
    email: isDutyData() ? data[0].duty[0].email : '',
  };

  const getFieldDecorator = opts.form && opts.form.getFieldDecorator;
  // 责任部门（或责任人）
  const noForm = isEditConfig(opts) || (
    <div className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <span>部门：</span>
          <span>{dutyData.department}</span>
        </Col>
        <Col {...colQuery}>
          <span>姓名：</span>
          <span>{dutyData.name}</span>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <span>办公室电话：</span>
          <span>{dutyData.phone}</span>
        </Col>
        <Col {...colQuery}>
          <span>手机号码：</span>
          <span>{dutyData.tel}</span>
        </Col>
        <Col {...colQuery}>
          <span>电子邮箱：</span>
          <span>{dutyData.email}</span>
        </Col>
      </Row>
    </div>
  );
  const saveForm = (
    <div key="saveForm" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="部门：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('department', {
                initialValue: dutyData.department,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="姓名：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('name', {
                initialValue: dutyData.name,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="办公室电话：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('phone', {
                initialValue: dutyData.phone,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="手机号码：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('tel', {
                initialValue: dutyData.tel,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="电子邮箱：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('email', {
                initialValue: dutyData.email,
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
  // 操作区
  const handler = isEditConfig(opts) ? (
    <Form key="editConfigForm" onSubmit={fn.onSubmit.bind(null, data)}>
      {saveForm}
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
  // 获取指令追踪的当前step
  const currentStep = data.length
    ? data[0].directive
      ? data[0].directive[data[0].directive.length - 1].directiveStep
      : 0
    : 0;
  // 获取当前查询的指令
  const currentDirective = data.length
    ? data[0].directive
      ? data[0].directive[data[0].directive.length - 1]
      : ''
    : '';
  // 获取当前指令步骤的描述
  const currentDirectiveDesc = [
    <p key="name" className={styles.dotp}>
      {data.length && currentDirective.directiveDes}
    </p>,
    <span key="date" className={styles.dotspan}>
      {data.length && unixFormatter(currentDirective.updateAt)}
    </span>,
  ];
  // 扩频表/物联网表(主模板)
  const main = (
    <div key="main">
      <div className="hangTitle">
        <p>指令追踪：</p>
      </div>
      <div>
        {opts.modalSort !== 'nblot' ? (
          <Steps direction={getDirection()} current={currentStep} progressDot={customDot}>
            <Step title="网关" description={currentStep === 0 ? currentDirectiveDesc : []} />
            <Step title="数据中心" description={currentStep === 1 ? currentDirectiveDesc : []} />
            <Step title="集中器" description={currentStep === 2 ? currentDirectiveDesc : []} />
            <Step title="扩频表" description={currentStep === 3 ? currentDirectiveDesc : []} />
            <Step title="集中器" description={currentStep === 4 ? currentDirectiveDesc : []} />
            <Step title="数据中心" description={currentStep === 5 ? currentDirectiveDesc : []} />
          </Steps>
        ) : (
          <Steps direction={getDirection()} current={currentStep} progressDot={customDot}>
            <Step title="网关" description={currentStep === 0 ? currentDirectiveDesc : []} />
            <Step title="数据中心" description={currentStep === 1 ? currentDirectiveDesc : []} />
            <Step title="物联网表" description={currentStep === 2 ? currentDirectiveDesc : []} />
            <Step title="数据中心" description={currentStep === 3 ? currentDirectiveDesc : []} />
          </Steps>
        )}
      </div>
      <div className="hangTitle">
        <p>指令详细：</p>
      </div>
      <div className="hangSubTitle">
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>指令类型：</span>
            {data.length && data[0].directive && <span>{currentDirective.directiveType}</span>}
          </Col>
          <Col {...colQuery}>
            <span>指令状态：</span>
            {data.length &&
              data[0].directive !== undefined &&
              formatDefaultStatus(currentDirective.directiveStatus)}
          </Col>
          <Col {...colQuery}>
            <span>到达时间：</span>
            {data.length &&
              data[0].directive && <span>{unixFormatter(currentDirective.updateAt)}</span>}
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="hangTitle">
        {/* <p>
          {opts.tab && opts.radio
            ? `${opts.tab}/${opts.radio}`
            : `${opts.sortGroup[opts.modalSort]}`}：
        </p> */}
        <p>{`${opts.sortGroup[opts.modalSort]}`}:</p>
      </div>
      <div className="hangSubTitle">
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>表编号：</span>
            {data.length && (
              <span>{opts.modalSort !== 'nblot' ? data[0].spreadCode : data[0].nblotCode}</span>
            )}
          </Col>
          <Col span={opts.modalSort !== 'nblot' ? 8 : 16}>
            <span>燃气公司：</span>
            {data.length && <span>{data[0].company}</span>}
          </Col>
          {opts.modalSort !== 'nblot' && (
            <Col {...colQuery}>
              <span>集中器：</span>
              {data.length && <span>{data[0].concentratorCode}</span>}
            </Col>
          )}
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>价格(元)：</span>
            {data.length && <span>{data[0].price}</span>}
          </Col>
          <Col {...colQuery}>
            <span>价格类型：</span>
            {data.length && data[0].priceType !== undefined && formatPriceType(data[0].priceType)}
          </Col>
          <Col {...colQuery}>
            <span>价格版本：</span>
            {data.length && <span>{data[0].priceVersion}</span>}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>价格状态：</span>
            {data.length &&
              data[0].priceStatus !== undefined &&
              formatDefaultStatus(data[0].priceStatus)}
          </Col>
          <Col {...colQuery}>
            <span>调价时间：</span>
            {data.length && <span>{unixFormatter(data[0].priceUpdateAt)}</span>}
          </Col>
          <Col {...colQuery}>
            <span>有效期至：</span>
            {data.length && <span>{unixFormatter(data[0].priceEndAt)}</span>}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>电池状态：</span>
            {data.length &&
              data[0].batteryStatus !== undefined &&
              formatBatteryStatus(data[0].batteryStatus)}
          </Col>
          <Col {...colQuery}>
            <span>电池电压：</span>
            {data.length && (
              <span>{`${data[0].remainVoltage} / ${data[0].totalVoltage} ( ${data[0].remainVoltage /
                data[0].totalVoltage *
                100}% )`}</span>
            )}
          </Col>
          <Col {...colQuery}>
            <span>时长(使用/理想)：</span>
            {data.length && <span>{`${data[0].useDuration} / ${data[0].desigDuration}`}</span>}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>阀门状态：</span>
            {data.length && data[0].tapStatus !== undefined && formatTapStatus(data[0].tapStatus)}
          </Col>
          <Col span={16}>
            <span>指令执行后(阀门控制)：</span>
            {data.length && data[0].tapControl !== undefined && formatTapStatus(data[0].tapControl)}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>上报状态：</span>
            {data.length &&
              data[0].sendStatus !== undefined &&
              formatDefaultStatus(data[0].sendStatus)}
          </Col>
          <Col {...colQuery}>
            <span>未上报/已上报：</span>
            {data.length && <span>{`${data[0].noSend} / ${data[0].finishedSend}`}</span>}
          </Col>
          <Col {...colQuery}>
            <span>上报时间：</span>
            {data.length && <span>{unixFormatter(data[0].sendUpdateAt)}</span>}
          </Col>
        </Row>
      </div>
      <div className="hangTitle">
        <p>燃气用户：</p>
      </div>
      <div className="hangSubTitle">
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>姓名：</span>
            {data.length && data[0].user && <span>{data[0].user.userName}</span>}
          </Col>
          <Col span={16}>
            <span>卡号：</span>
            {data.length && data[0].user && <span>{data[0].user.cardId}</span>}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <span>详细地址：</span>
            {data.length && data[0].user && <span>{data[0].user.address}</span>}
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="hangTitle">
        <p>责任部门（或责任人）：</p>
      </div>
      {noForm}
    </div>
  );
  const concentrator = (
    <div key="concentrator">
      <div className="hangTitle">
        <p>集中器：</p>
      </div>
      <div className="hangSubTitle">
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>编号：</span>
            {data.length && <span>{data[0].concentratorCode}</span>}
          </Col>
          <Col span={16}>
            <span>燃气公司：</span>
            {data.length && <span>{data[0].company}</span>}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>集中器状态：</span>
            {data.length &&
              data[0].cardStatus !== undefined &&
              formatDefaultStatus(data[0].cardStatus)}
          </Col>
          <Col {...colQuery}>
            <span>实际表数/计划表数：</span>
            {data.length && (
              <span>{`${data[0].factNum ? data[0].factNum : 0} / ${
                data[0].totalNum ? data[0].totalNum : 0
              }`}</span>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <span>安装地址：</span>
            {data.length && <span>{data[0].setupAddress}</span>}
          </Col>
        </Row>
      </div>
    </div>
  );
  const unusual = (
    <div key="unusual">
      <div className="hangTitle">
        <p>异常报警：</p>
      </div>
      <div className="hangSubTitle">
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>编号：</span>
            {data.length && <span>{data[0].meterCode}</span>}
          </Col>
          <Col {...colQuery}>
            <span>燃气公司：</span>
            {data.length && <span>{data[0].companyCode}</span>}
          </Col>
          <Col {...colQuery}>
            <span>预警状态：</span>
            {data.length &&
              data[0].alarmStatus !== undefined &&
              formatDefaultStatus(data[0].alarmStatus)}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>报警类型：</span>
            {data.length && formatAlarmType(data[0].alarmType)}
          </Col>
          <Col {...colQuery}>
            <span>报警次数：</span>
            {data.length && <span>{data[0].alarmNum}</span>}
          </Col>
          <Col {...colQuery}>
            <span>报警时间：</span>
            {data.length && <span>{unixFormatter(data[0].alarmAt)}</span>}
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="hangTitle">
        <p>责任部门（或责任人）：</p>
      </div>
      {noForm}
    </div>
  );
  const shipping = (
    <div key="shipping">
      <div className="hangTitle">
        <p>发货记录：</p>
      </div>
      <div className="hangSubTitle">
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>编号：</span>
            {data.length && <span>{data[0].expressCode}</span>}
          </Col>
          <Col span={16}>
            <span>燃气公司：</span>
            {data.length && <span>{data[0].company}</span>}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...colQuery}>
            <span>快递公司：</span>
            {data.length && <span>{data[0].express}</span>}
          </Col>
          <Col {...colQuery}>
            <span>发货单号：</span>
            {data.length && <span>{data[0].orderId}</span>}
          </Col>
          <Col {...colQuery}>
            <span>发货时间：</span>
            {data.length && <span>{unixFormatter(data[0].deliveryAt)}</span>}
          </Col>
        </Row>
      </div>
    </div>
  );
  const nocontent = <div>什么都没有</div>;

  const content = {
    spread: [main, handler],
    nblot: [main, handler],
    concentrator: [concentrator, handler],
    unusual: [unusual, handler],
    shipping: [shipping, handler],
  };

  return content[opts.modalSort] || nocontent;
};
