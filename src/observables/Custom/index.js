import { combineLatest } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { fromEvent } from 'rxjs/observable/fromEvent';
// 操作符
import { map, switchMap, last } from 'rxjs/operators';

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
export const spread$ = fromPromise(fetchSpread()).pipe(
  map(parseRxjsResponse),
  last()
);
// 集中器
const concentrator$ = fromPromise(fetchConcentrator()).pipe(
  map(parseRxjsResponse),
  last()
);
// 物联网表
const nblot$ = fromPromise(fetchNblot()).pipe(
  map(parseRxjsResponse),
  last()
);
// 扩频表:发货记录
const shipping$ = fromPromise(fetchShipping()).pipe(
  map(parseRxjsResponse),
  last()
);
// 物联网表:发货记录
const nblotShipping$ = fromPromise(fetchNblotShipping()).pipe(
  map(parseRxjsResponse),
  last()
);
// 异常报警: 扩频表
const unusualSpread$ = fromPromise(fetchUnusualSpread()).pipe(
  map(parseRxjsResponse),
  last()
);
// 异常报警: 物联网表
const unusualNblot$ = fromPromise(fetchUnusualNblot()).pipe(
  map(parseRxjsResponse),
  last()
);

// Click Me
export const click$ = target => fromEvent(target, 'click').pipe(switchMap(() => nblot$));

export default combineLatest(
  spread$,
  concentrator$,
  shipping$,
  nblot$,
  nblotShipping$,
  unusualSpread$,
  unusualNblot$
);
