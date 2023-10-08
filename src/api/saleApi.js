/* eslint-disable @typescript-eslint/no-explicit-any */
import { SALE } from './apiConstant';
import BaseApi from './baseApi';

class SaleApi extends BaseApi {
    getList(param) {
        return this.post(`${SALE}/list`, param);
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
        return this.post(`${SALE}/add`, param);
    }
    // deleteRecord(id: string): Promise<DatabasesData> {
    //     return this.deleteMany<DatabasesData>(DBS, { id: [id] });
    // }
    delete(idList){
        return this.post(`${SALE}/delete`, idList);
    }
}
export default SaleApi;
