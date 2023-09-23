/* eslint-disable @typescript-eslint/no-explicit-any */
import { CATEGORY } from './apiConstant';
import BaseApi from './baseApi';

class CategoryApi extends BaseApi {
    getList(param) {
        return this.post(`${CATEGORY}/list`, param);
    }

    getById(id) {
        if (id) {
            return this.get(`${CATEGORY}/${id}`);
        }
        return Promise.resolve(null);
    }
    // updateRecord(
    //     id: string,
    //     data: bodyRequestCreateDatabase,
    // ): Promise<DatabasesData> {
    //     return this.put<DatabasesData>(`${DBS}/${id}`, data);
    // }

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
    // deleteRecord(id: string): Promise<DatabasesData> {
    //     return this.deleteMany<DatabasesData>(DBS, { id: [id] });
    // }
}
export default CategoryApi;
