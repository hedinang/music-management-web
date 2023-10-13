/* eslint-disable @typescript-eslint/no-explicit-any */
import { CUSTOMER, LOGIN } from './apiConstant';
import BaseApi from './baseApi';

class CustomerApi extends BaseApi {
    getList(param) {
        param.type = 'CLIENT'
        return this.post(`${CUSTOMER}/list`, param);
    }
    // getOneRecord(id: string): Promise<DatabasesData | null> {
    //     if (id) {
    //         return this.get<DatabasesData>(`${DBS}/${id}`);
    //     }
    //     return Promise.resolve(null);
    // }
    // updateRecord(
    //     id: string,
    //     data: bodyRequestCreateDatabase,
    // ): Promise<DatabasesData> {
    //     return this.put<DatabasesData>(`${DBS}/${id}`, data);
    // }

    create(param) {
        param.type = 'CLIENT'
        return this.post(`${CUSTOMER}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    delete(idList){
        return this.post(`${CUSTOMER}/delete`, idList);
    }
}
export default CustomerApi;
