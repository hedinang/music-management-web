
import { LOGIN, ADMIN } from './apiConstant';
import BaseApi from './baseApi';

class AuthApi extends BaseApi {
    login(body) {
        return this.post(LOGIN, body);
    }
    getMe(token) {
        return this.post(`${ADMIN}/me`, {}, {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })
    }
}
export default AuthApi;
