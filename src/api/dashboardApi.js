
import { DASHBOARD } from './apiConstant';
import BaseApi from './baseApi';

class DashboardApi extends BaseApi {
    summary() {
        return this.get(`${DASHBOARD}/summary`);
    }
}
export default DashboardApi;
