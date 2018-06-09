/*
 * @Author: Kevin Bolton
 * @Date: 2018-01-03 23:18:25
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-06-09 12:19:30
 */

import { Button, Cascader, DatePicker, Form, Input, message } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import PropTypes from 'prop-types';
import * as React from 'react';
// Observable
import { click$ } from '../../observables/Custom';
// 常量
import { MESSAGE_NOINPUT } from '../../utils/consts';
// 方法
import { getCityOptions } from '../../utils/fns';
// 声明
import { IDetailProps, IDetailStates } from './';
// 样式
const styles = require('./DetailHandler.less');
// 引入 dataMonitorCols
import { dataMonitorCols } from '../../routes/Service/columns';
// Help
import { formatDefaultStatus, formatPriceType, formatScanMethod } from '../../utils/help';

const { RangePicker }: any = DatePicker;
const { Search } = Input;

// 枚举
const searcHolder: any = {
  spread: '表号/集中器编号/燃气公司名称',
  nblot: '表号/燃气公司名称',
  unusual: '请输入查询关键字',
  company: '请输入燃气公司名称',
};

// 获取省份/城市级联菜单的项
const cityOptions = getCityOptions();
// 级联菜单: 搜索
const filter: any = (inputValue: string, path: string[]) =>
  path.some((option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

class DetailHandler extends React.PureComponent<IDetailProps, IDetailStates> {
  static contextTypes = {
    dispatch: PropTypes.func,
  };
  dateFormat = {
    dately: 'YYYY年MM月DD日',
  };

  constructor(props: any) {
    super(props);
  }

  // select date
  onChange = (dates: any, dateStrings: any) => {
    const { filterData } = this.props;
    console.log(dates, 'dates');
    console.log(dateStrings, 'dateStrings');
    if (dateStrings[0] !== '' || dateStrings[1] !== '') {
      filterData(`SELECTDATE,${dates[0]},${dates[1]}`);
    }
  };
  // search
  getSearch = (value: any) => {
    if (!value) {
      message.warning(MESSAGE_NOINPUT);
    } else {
      console.log(value);
      if (this.props.filterData) this.props.filterData(value);
    }
  };
  enterSearch = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    this.getSearch(value);
  };
  // reset
  resetFields = () => {
    const { form, hideDatePicker, showSelectCity } = this.props;
    const { setFieldsValue } = form;

    setFieldsValue({ search: '' });
    if (!hideDatePicker) setFieldsValue({ rangedate: null });
    if (showSelectCity) setFieldsValue({ city: null });
  };
  // click 重置 Button
  clickReset = () => {
    if (this.props.resetData) this.props.resetData();
    this.resetFields();
  };
  // click 导出 Buttom
  clickExport = () => {
    // console.log('导出至EXCEL');
    const data = this.props.data || [];
    if (data.length === 0) {
      console.error('没有导出的数据');
      return;
    }
    const sheetHeader = this.getSheetHeader(dataMonitorCols().spread);
    const sheetData = this.getSheetData(data);
    const datas = [
      {
        sheetName: 'sheet',
        sheetHeader,
        sheetData,
      },
    ];
    const options = { fileName: '导出至EXCEL', datas };

    // 导出
    const toExcel = new ExportJsonExcel(options);
    toExcel.saveExcel();
  };
  // 获取sheetHeader
  getSheetHeader = (sheetHeader: any[]) => {
    const expend = ['价格', '价格类型'];
    const handlerArr = sheetHeader.reduce((arr, current) => arr.concat(current.title), []);
    const result = [...handlerArr.slice(0, handlerArr.length - 1), ...expend];
    return result;
  };
  // 获取sheetData
  getSheetData = (sheetData: any[]) =>
    sheetData.reduce((arr, current) => {
      arr.push({
        spreadCode: current.spreadCode,
        company: current.company,
        scanMethod: formatScanMethod(current.scanMethod, 'excel'),
        sendStatus: formatDefaultStatus(current.sendStatus, 'excel'),
        price: current.price,
        priceType: formatPriceType(current.priceType, 'excel'),
      });
      return arr;
    }, []);

  // 选择城市
  changeCity = (value: string[]) => {
    if (this.props.changeCity) this.props.changeCity(value);
  };

  // Click me
  clickMe = (event: any) => {
    const sub = click$(event.target).subscribe((value: any) => {
      this.props.clickMe(value);
      sub.unsubscribe();
    });
  };

  render() {
    const { dately } = this.dateFormat;
    const { form, sort, hideDatePicker, showSelectCity } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.hander}>
        <Form>
          {showSelectCity && (
            <div className={styles.item}>
              <span>选择：</span>
              {getFieldDecorator('city')(
                <Cascader
                  placeholder="省份/城市"
                  size="default"
                  expandTrigger="hover"
                  notFoundContent="请输入正确的城市名"
                  style={{ width: 150 }}
                  options={cityOptions}
                  showSearch={{ filter }}
                  onChange={this.changeCity}
                />
              )}
            </div>
          )}
          <div className={styles.item}>
            <span>查询：</span>
            {getFieldDecorator('search')(
              <Search
                enterButton={true}
                style={{ width: 300 }}
                placeholder={searcHolder[sort || 'spread']}
                onSearch={this.getSearch}
                onPressEnter={this.enterSearch}
              />
            )}
          </div>
          <div className={styles.item}>
            <Button onClick={this.clickReset}>重置</Button>
          </div>
          {hideDatePicker || (
            <div className={styles.item}>
              {getFieldDecorator('rangedate')(
                <RangePicker allowClear={false} onChange={this.onChange} format={dately} />
              )}
            </div>
          )}
          <div className={styles.item}>
            <Button onClick={this.clickExport}>导出至EXCEL</Button>
          </div>
          <div className={styles.item}>
            <Button loading={this.props.loading} id="clickMe" type="primary" onClick={this.clickMe}>
              点击Me
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(DetailHandler) as React.ClassicComponentClass<IDetailProps>;
