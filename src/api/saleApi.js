/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sale } from './apiConstant';
import BaseApi from './baseApi';

class SaleApi extends BaseApi {
    getList(param) {
        return this.post(`${Sale}/list`, param);
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
        return this.post(`${Sale}/add`, param);
    }
    // deleteRecord(id: string): Promise<DatabasesData> {
    //     return this.deleteMany<DatabasesData>(DBS, { id: [id] });
    // }
}
export default SaleApi;
