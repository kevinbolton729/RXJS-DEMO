import { combineLatest } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
// 操作符
import { map } from 'rxjs/operators';

// 解析响应
import { parseRxjsResponse } from '@/utils/parse';

// // API
import {
  fetchSpread,
  fetchConcentrator,
  fetchShipping,
  fetchNblot,
  fetchNblotShipping,
  fetchUnusualSpread,
  fetchUnusualNblot,
} from '@/services/api';

// 创建Observable
// 扩频表
const spread$ = fromPromise(fetchSpread()).pipe(map(parseRxjsResponse));
// 集中器
const concentrator$ = fromPromise(fetchConcentrator()).pipe(map(parseRxjsResponse));
// 物联网表
const nblot$ = fromPromise(fetchNblot()).pipe(map(parseRxjsResponse));
// 扩频表:发货记录
const shipping$ = fromPromise(fetchShipping()).pipe(map(parseRxjsResponse));
// 物联网表:发货记录
const nblotShipping$ = fromPromise(fetchNblotShipping()).pipe(map(parseRxjsResponse));
// 异常报警: 扩频表
const unusualSpread$ = fromPromise(fetchUnusualSpread()).pipe(map(parseRxjsResponse));
// 异常报警: 物联网表
const unusualNblot$ = fromPromise(fetchUnusualNblot()).pipe(map(parseRxjsResponse));

export default combineLatest(
  spread$,
  concentrator$,
  shipping$,
  nblot$,
  nblotShipping$,
  unusualSpread$,
  unusualNblot$
);
