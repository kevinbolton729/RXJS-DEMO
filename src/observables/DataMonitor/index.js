import { Observable } from 'rxjs/Observable';
import '@/observables';

// 解析响应
import { parseRxjsResponse } from '@/utils/parse';

// // API
import { fetchDataSpread, fetchDataConcentrator, fetchDataNblot, fetchDuty } from '@/services/api';

// 创建Observable
// 扩频表
const spreadData$ = Observable.fromPromise(fetchDataSpread());
// 集中器
const concentratorData$ = Observable.fromPromise(fetchDataConcentrator());
// 物联网表
const nblotData$ = Observable.fromPromise(fetchDataNblot());
// 责任部门（或责任人）
const dutyData$ = Observable.fromPromise(fetchDuty());

export default Observable.zip(spreadData$, concentratorData$, nblotData$, dutyData$).map(
  parseRxjsResponse
);
