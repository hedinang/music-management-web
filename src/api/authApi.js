/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN } from './apiConstant';
import BaseApi from './baseApi';

class AuthApi extends BaseApi {
    login(body) {
        return this.post(LOGIN, body);
    }
}
export default AuthApi;
