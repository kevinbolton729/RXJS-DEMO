import { combineLatest } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
// 操作符
import { map } from 'rxjs/operators';

// 解析响应
import { parseRxjsResponse } from '@/utils/parse';

// // API
import { fetchDataSpread, fetchDataConcentrator, fetchDataNblot, fetchDuty } from '@/services/api';

// 创建Observable
// 扩频表
const spreadData$ = fromPromise(fetchDataSpread()).pipe(map(parseRxjsResponse));
// 集中器
const concentratorData$ = fromPromise(fetchDataConcentrator()).pipe(map(parseRxjsResponse));
// 物联网表
const nblotData$ = fromPromise(fetchDataNblot()).pipe(map(parseRxjsResponse));
// 责任部门（或责任人）
const dutyData$ = fromPromise(fetchDuty()).pipe(map(parseRxjsResponse));

export default combineLatest(spreadData$, concentratorData$, nblotData$, dutyData$);
