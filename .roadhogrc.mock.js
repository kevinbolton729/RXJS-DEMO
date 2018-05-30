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

export default (noProxy ? {} : delay(proxy, 1500));
