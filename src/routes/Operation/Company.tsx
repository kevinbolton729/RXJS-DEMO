import { Form, Table } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
import DetailHandler from '../../components/Handler/DetailHandler';
import { openModal } from '../../components/Modal';
// Observable
import Observable from '../../observables/Company';
// 常量
import { MODEL_WIDTH_EDIT } from '../../utils/consts';
// 方法
import { dispatchAction } from '../../utils/fns';
// 声明
import { ICompanyItems, ICompanyProps, ICompanyStates } from './';
// 模块
import { companyCols } from './columns';
import tpl from './detailTpl';

// 枚举
enum sortGroup {
  company = '燃气公司',
}

@connect(({ loading, company }: any) => ({
  confirmLoading: loading.effects['company/fetchConfig'],
  companyList: company.companyList,
}))
class Company extends React.PureComponent<ICompanyProps, ICompanyStates> implements ICompanyItems {
  constructor(props: any) {
    super(props);
    this.state = {
      // 请求数据
      loading: true,
      // Modal
      modalSort: 'company', // 'company':燃气公司
      selectedRecord: [],
      visible: false,
      isEditConfig: false,
      isClick: false, // 更新配置时，是否点击【保存】
    };
  }

  componentDidMount() {
    // 发起相应API请求
    this.startFetch();
  }
  componentDidUpdate() {
    // 点击【保存】后，更新成功时关闭编辑配置
    this.afterSaveCloseConfig();
  }

  // 获取数据
  // 生成最终显示的列表数据
  showData = (type: string = 'company') => {
    const { companyList } = this.props;
    const list = {
      company: companyList,
    };

    return list[type];
  };
  // Dispatch Action
  dispatchAction = (type: any, payload?: any) => {
    payload ? dispatchAction(this.props, { type, payload }) : dispatchAction(this.props, { type });
  };
  // 订阅API请求
  startFetch = () => {
    Observable.subscribe(data => {
      // 获取燃气公司
      this.dispatchAction('company/changeCompanyList', data[0]);

      // 隐藏数据请求loading
      this.setState({
        loading: false,
      });
    });
  };
  // 查看
  handlerShow = (record: any, key: string) => {
    this.setState({
      selectedRecord: [record],
    });
    this.closeConfig();
    this.openModal(key);
  };
  // 配置
  handlerConfig = () => {
    this.setState({
      isEditConfig: true,
    });
  };
  // 关闭编辑配置
  closeConfig = () => {
    this.setState({
      isEditConfig: false,
      isClick: false,
    });
  };
  // 点击【保存】后，关闭编辑配置
  afterSaveCloseConfig = () => {
    if (this.state.isClick && !this.props.confirmLoading) {
      this.closeConfig();
    }
  };
  // 表单
  // 保存
  onSubmit = (data: any, event: any) => {
    event.preventDefault();
    console.log('已点击【保存】');
    this.setState({ isClick: true });

    const { confirmLoading, form } = this.props;

    if (!confirmLoading) {
      form.validateFields({ force: true }, (err: any, values: any) => {
        if (!err) {
          // console.log(data.id, 'id');
          // console.log(values, 'values');

          this.dispatchAction('company/fetchConfig');
        }
      });
    }
  };
  // 重置
  onReset = () => {
    console.log('重置');
    const { form } = this.props;
    form.resetFields([
      'sysname',
      'version',
      'method',
      'updatetime',
      'ip',
      'port',
      'mac',
      'sqlversion',
      'sync',
      'read',
      'other',
      'dllverison',
      'city',
      'company',
      'companyCode',
      'des',
    ]);
  };
  // 选择城市
  changeCity = (value: string[]) => {
    console.log(value, 'selected city');
  };
  // 分页
  onChangePage = (page: number, pageSize: number) => {
    console.log(page, 'page');
    console.log(pageSize, 'pageSize');
  };
  // 页长
  onShowSizeChange = (current: number, size: number) => {
    console.log(current, 'current');
    console.log(size, 'size');
  };
  // [Modal]
  openModal = (modalSort: string = 'company') => {
    this.setState({ modalSort, visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { confirmLoading, form } = this.props;
    const { loading, visible, modalSort, selectedRecord, isEditConfig } = this.state;
    // 获取Table的Columns
    const getColumns = companyCols(this.handlerShow);
    // 生成Table渲染数据
    const dataSource = this.showData();
    const pagination = {
      size: 'small',
      showSizeChanger: true,
      defaultCurrent: 1,
      defaultPageSize: 20,
      pageSizeOptions: ['10', '20', '30', '50'],
      total: 0,
      onChange: this.onChangePage,
      onShowSizeChange: this.onShowSizeChange,
    };
    // Modal
    const passChildren = tpl(
      selectedRecord,
      {
        closeModal: this.closeModal,
        handlerConfig: this.handlerConfig,
        closeConfig: this.closeConfig,
        onSubmit: this.onSubmit,
        onReset: this.onReset,
        changeCity: this.changeCity,
      },
      {
        form,
        sortGroup,
        modalSort,
        isConfig: true, // 是否显示配置按钮
        isEditConfig, // 是否为配置编辑状态
        confirmLoading,
      }
    );

    return (
      <div>
        {// Modal
        openModal.apply(this, [
          {
            title: '详情',
            width: MODEL_WIDTH_EDIT,
            children: passChildren,
            visible,
            closable: true,
            loading,
            footer: null,
          },
        ])}
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <div className="areaTop">
            <DetailHandler
              changeCity={this.changeCity}
              showSelectCity={true}
              hideDatePicker={true}
              sort="company"
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Table
              rowKey="companyCode"
              columns={getColumns.company}
              loading={loading}
              dataSource={dataSource}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Company) as React.ClassicComponentClass<ICompanyProps>;
