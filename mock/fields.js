// 文字信息
export const messageSuccess = '获取数据成功';
export const saveSuccess = '已保存配置';
export const loginSuccess = '登录成功';
export const loginOutSuccess = '已安全退出';
export const updatePwdSuccess = '登录密码已修改';
export const updateSuccess = '更新成功';
// 标识
export const tagRequired = '[必填]';
export const tagNoRequired = '[选填]';
// 字数限制
export const wordLimit = '字数不超过200字';
// 字段类型
export const typeUnix13 = 1524032521415;

// 字段定义
const fields = {
  createAt: typeUnix13,
  updateAt: typeUnix13,
  detail: '详情',
  city: '510000,510100', // 省份/城市 eg. '四川省,成都市'
  description: `备注说明... ps:${wordLimit}`, // 备注说明
  // 燃气用户
  user: '燃气用户',
  userName: '鱼子酱', // 用户姓名
  cardId: '0000126', // 卡号
  address: '成华区崔家店路天空城', // 详细地址
  // 价格
  price: '2.84', // 价格(元)
  priceType: 1, // 价格类型 0:后付费 1:预付费
  priceHistory: '历史价格记录',
  priceValue: 2.84, // 历史价格金额(元)
  priceVersion: '1.1', // 价格版本
  priceStatus: 1, // 价格状态 0:异常 1:正常
  priceEndAt: `${typeUnix13}`,
  // 扩频表
  spread: '扩频表',
  spreadCode: 'S0001000X', // 表编号
  companyCode: 'COMPANY001', // 公司编码
  company: '海力智能燃气示范公司', // 公司名称
  scanMethod: 0, // 扫频方式 0:手动 1:自动
  extractStatus: 1, // 数据提取状态 0:失败 1:成功
  batteryStatus: 2, // 电池状态  0:消耗过大 1:正常 2:消耗过快
  remainVoltage: 1.2, // 剩余电压
  totalVoltage: 3.0, // 满电电压
  useDuration: 50, // 已使用时长(小时)
  desigDuration: 3000, // 理想使用时长(小时)
  tapStatus: 0, // 阀门状态 0:异常 1:开启 2:关闭
  tapControl: 1, // 阀门控制(指令执行后) 0:异常 1:开启 2:关闭
  sendStatus: 1, // 上报状态 0:异常 1:正常
  noSend: 3, // 未上报(次数)
  finishedSend: 30, // 已上报(次数)
  sendUpdateAt: `${typeUnix13}`, // 上报时间
  // 集中器
  concentrator: '集中器',
  concentratorCode: 'C0001000X', // 集中器编号
  cardStatus: 0, // 集中器状态 0:异常 1:正常
  factNum: 53, // 实际挂表数
  totalNum: 200, // 全部表数
  setupAddress: '二仙桥崔家店路天空城', // 安装地址
  // 物联网表
  nblot: '物联网表',
  nblotCode: 'N0001000X', // 表编号
  onLineStatus: 0, // 在线状态 0:已离线 1:在线
  uploadStatus: 1, // 数据上传状态 0:失败 1:成功
  // 责任部门（或责任人）
  duty: '责任部门（或责任人）',
  dutyCode: 'DUTY00001', // 信息编号
  department: '客户服务部', // 部门
  name: '鱼子酱', // 姓名
  phone: '(028) 12345678', // 办公电话
  tel: '13712345678', // 手机号码
  email: 'example@qq.com', // 电子邮箱
  // 指令
  directive: '指令',
  directiveCode: 'D0001', // 指令编号
  directiveType: '充值', // 指令类型
  directiveStatus: 1, // 指令状态 0:异常 1:正常
  directiveDes: '用户已支付', // 指令描述 eg.用户已支付 / 费用已上表 等
  directiveStep: 1, // 指令阶段 从小标0开始
  // 发货记录
  packageCode: 'PK0001', // 装箱编号
  palletCode: 'PT0002', // 托盘编号
  meterCode: 'S0001000X', // 表具编号
  expressCode: 'SF01', // 快递公司编号
  express: '顺丰快递', // 快递公司名称
  orderId: 'SF00001000X', // 发货单号
  deliveryAt: `${typeUnix13}`, // 发货时间
  // 异常报警
  alarmNum: 3, // 报警次数
  alarmType: '开户', // 报警类型
  alarmStatus: 1, // 预警状态 0:异常 1:正常
  alarmAt: `${typeUnix13}`, // 报警时间
  // 燃气公司运营
  sysName: 'HL-6', // 系统名称
  sysVersion: '6.5', // 系统版本
  getMethod: 1, // 采集方式 0:静默定时 1:静默实时
  runStatus: 1, // 运行状态 0:异常 1:正常
  ip: '127.0.0.1', // IP地址
  port: '8081', // 端口号
  mac: '00-00-00-00-DF', // MAC地址
  sqlVersion: 'MYSQL 7.0', // 数据库版本
  sync: true, // 数据库时间是否与服务器时间同步 eg. true:同步 false:不同步
  readWrither: 'RW-1.2', // 读写器型号
  otherDevices: 'OTHER-2.4', // 其他设备型号
  dllVersion: 'DLL 1.0.5', // DLL文件版本
  getDataAt: `${typeUnix13}`, // 采集数据时间
  // 登录用户信息（资料）
  userid: '595f87fe682e091380f2ad90', // 登录用户编码
  nickname: '鱼子酱', // 用户昵称(界面显示)
  portrait: '/uploads/images/portrait/1528258710064.jpeg', // 头像地址
  role: 1000, // 用户权限 eg. 1000:'admin' 2000:'monitor' 3000:'custom'
  sex: 1, // 用户权限 ${typeNumber} eg. 0:女 1:男
  createDate: 1502122350526,
  updateDate: 1528258710065,
};
export default fields;
