import { Observable } from 'rxjs/Observable';
import '@/observables';

// 解析响应
import { parseRxjsResponse } from '@/utils/parse';

// // API
import { fetchCompany } from '@/services/api';

// 创建Observable
// 燃气公司
const company$ = Observable.fromPromise(fetchCompany());

export default company$.scan((arr, current) => parseRxjsResponse([current]), []);
