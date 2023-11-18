import { ADMIN } from './apiConstant';
import BaseApi from './baseApi';

class AdminApi extends BaseApi {
    getList(param) {
        param.type = 'CLIENT'
        return this.post(`${ADMIN}/admin-list`, param);
    }
    getById(id) {
        if (id) {
            return this.get(`${ADMIN}/admin/${id}`);
        }
        return Promise.resolve(null);
    }
    update(param) {
        return this.put(`${ADMIN}/update`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    create(param) {
        param.type = 'CLIENT'
        return this.post(`${ADMIN}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    delete(idList) {
        return this.post(`${ADMIN}/delete`, idList);
    }

    logout() {
        return this.post(`${ADMIN}/logout`);
    }
}
export default AdminApi;
