/* eslint-disable @typescript-eslint/no-explicit-any */
import { CATEGORY } from './apiConstant';
import BaseApi from './baseApi';

class CategoryApi extends BaseApi {
    getList(param) {
        return this.post(`${CATEGORY}/list`, param);
    }

    getById(id) {
        if (id) {
            return this.get(`${CATEGORY}/admin/${id}`);
        }
        return Promise.resolve(null);
    }

    update(param) {
        return this.put(`${CATEGORY}/update`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    create(param) {
        return this.post(`${CATEGORY}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    delete(idList){
        return this.post(`${CATEGORY}/delete`, idList);
    }
}
export default CategoryApi;
