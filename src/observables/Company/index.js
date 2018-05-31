import { fromPromise } from 'rxjs/observable/fromPromise';
// 操作符
import { map } from 'rxjs/operators';

// 解析响应
import { parseRxjsResponse } from '@/utils/parse';

// // API
import { fetchCompany } from '@/services/api';

// 创建Observable
// 燃气公司
const company$ = fromPromise(fetchCompany()).pipe(map(parseRxjsResponse));

export default company$.pipe(map(value => [value]));
