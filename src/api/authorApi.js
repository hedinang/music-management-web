/* eslint-disable @typescript-eslint/no-explicit-any */
import { AUTHOR } from './apiConstant';
import BaseApi from './baseApi';

class AuthorApi extends BaseApi {
    getList(param) {
        return this.post(`${AUTHOR}/list`, param);
    }

    getById(id) {
        if (id) {
            return this.get(`${AUTHOR}/${id}`);
        }
        return Promise.resolve(null);
    }

    update(param) {
        return this.put(`${AUTHOR}/update`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    create(param) {
        return this.post(`${AUTHOR}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    delete(idList) {
        return this.deleteMany(`${AUTHOR}/delete`, idList);
    }
}
export default AuthorApi;
