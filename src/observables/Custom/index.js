import { Observable } from 'rxjs/Observable';
import '@/observables';

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
const spread$ = Observable.fromPromise(fetchSpread());
// 集中器
const concentrator$ = Observable.fromPromise(fetchConcentrator());
// 物联网表
const nblot$ = Observable.fromPromise(fetchNblot());
// 扩频表:发货记录
const shipping$ = Observable.fromPromise(fetchShipping());
// 物联网表:发货记录
const nblotShipping$ = Observable.fromPromise(fetchNblotShipping());
// 异常报警: 扩频表
const unusualSpread$ = Observable.fromPromise(fetchUnusualSpread());
// 异常报警: 物联网表
const unusualNblot$ = Observable.fromPromise(fetchUnusualNblot());

export default Observable.zip(
  spread$,
  concentrator$,
  shipping$,
  nblot$,
  nblotShipping$,
  unusualSpread$,
  unusualNblot$
).map(parseRxjsResponse);
