
import { CUSTOMER } from './apiConstant';
import BaseApi from './baseApi';

class CustomerApi extends BaseApi {
    getList(param) {
        param.type = 'CLIENT'
        return this.post(`${CUSTOMER}/list`, param);
    }
    getById(id) {
        if (id) {
            return this.get(`${CUSTOMER}/admin/${id}`);
        }
        return Promise.resolve(null);
    }
    update(param) {
        return this.put(`${CUSTOMER}/update`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    create(param) {
        param.type = 'CLIENT'
        return this.post(`${CUSTOMER}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    delete(idList) {
        return this.post(`${CUSTOMER}/delete`, idList);
    }

    logout() {
        return this.post(`${CUSTOMER}/logout`);
    }
}
export default CustomerApi;
