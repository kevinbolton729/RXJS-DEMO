import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';
import { messageSuccess, saveSuccess } from './mock/fields';
// 数据
import {
  spreadData,
  nblotData,
  concentratorData,
  shippingData,
  businessCompanyData,
  unusualData,
  userData,
  dutyData,
} from './mock/datas';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 获取接口返回的函数
// code 0:正常 1:错误
const getBody = (opts, code = 0) => ({
  code,
  message: opts.message || messageSuccess,
  data: opts.data || [],
});

// 代码中会兼容本地 service mock 以及部署站点的静态数据
// "POST /api/forms": (req, res) => {
//   res.send({ message: "Ok" });
// },
// "GET /api/tags": mockjs.mock({
//   "list|100": [{ name: "@city", "value|1-100": 150, "type|0-2": 1 }]
// }),

const proxy = {
  // [用户]
  // 登录
  // 'POST /api/admin/loginon': getBody({ data: [{ role: 1000 }] }),
  'POST /api/admin/loginon': (req, res) => {
    const { username, password } = req.body;

    if (username !== 'dev_admin') {
      res.send(getBody({ message: '用户名不存在' }, 1));
      return;
    }
    if (password !== '45af75a8aa4bbbe57c814d9c93397d50') {
      res.send(getBody({ message: '输入的登录密码错误' }, 1));
      return;
    }
    if (username === 'dev_admin' && password === '45af75a8aa4bbbe57c814d9c93397d50') {
      res.send(getBody({ data: [{ role: 1000 }] }));
    }
  },
  // 安全退出
  'POST /api/admin/loginout': getBody({ message: '已安全退出' }),
  // 获取登录用户资料
  'GET /api/admin/currentUser': getBody({ data: userData }),
  // 修改登录密码
  'POST /api/admin/updatepwd': getBody({ message: '您的登录密码已修改' }),
  // 修改用户资料
  'POST /api/admin/updateuser': getBody({ message: '修改成功' }),
  // [客户服务监控]
  // 获取扩频表 > 扩频表列表
  'GET /api/custom/fetchspread': getBody({ data: spreadData }),
  // 获取集中器列表
  'GET /api/custom/fetchconcentrator': getBody({ data: concentratorData }),
  // 获取扩频表 > 发货记录列表
  'GET /api/custom/fetchshipping': getBody({ data: shippingData }),
  // 获取物联网表 > 物联网表列表
  'GET /api/custom/fetchnblot': getBody({ data: nblotData }),
  // 获取物联网表 > 发货记录列表
  'GET /api/custom/nblot/fetchshipping': getBody({ data: shippingData }),
  // 获取异常报警 > 扩频表列表
  'GET /api/custom/unusual/fetchspread': getBody({ data: unusualData }),
  // 获取异常报警 > 物联网表列表
  'GET /api/custom/unusual/fetchnblot': getBody({ data: unusualData }),
  // [业务数据监控]
  // 获取扩频表 > 扩频表列表
  'GET /api/monitor/fetchspread': getBody({ data: spreadData }),
  // 获取集中器列表
  'GET /api/monitor/fetchconcentrator': getBody({ data: concentratorData }),
  // 获取物联网表 > 物联网表列表
  'GET /api/monitor/fetchnblot': getBody({ data: nblotData }),
  // 新增（或更新）责任部门（或责任人）
  'POST /api/monitor/spread/fetchconfig': getBody({ message: saveSuccess }),
  // [责任部门（或责任人）]
  // 获取责任部门（或责任人）
  'GET /api/duty/fetchduty': getBody({ data: dutyData }),
  // 新增（或更新）责任部门（或责任人）
  'POST /api/duty/fetchconfig': getBody({ message: saveSuccess }),
  // [燃气公司运营]
  // 获取公司列表
  'GET /api/company/fetchcompany': getBody({ data: businessCompanyData }),
  // 更新配置
  'POST /api/company/fetchconfig': getBody({ message: saveSuccess }),
};

export default (noProxy ? {} : delay(proxy, 1000));
