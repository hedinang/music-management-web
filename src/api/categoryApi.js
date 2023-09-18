/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN } from './apiConstant';
import BaseApi from './baseApi';

class CategoryApi extends BaseApi {
    getList(param) {
        if (param.page) {
            return this.get(param);
        }
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
    create(data) {
        return this.post(data);
    }
    // deleteRecord(id: string): Promise<DatabasesData> {
    //     return this.deleteMany<DatabasesData>(DBS, { id: [id] });
    // }
}
export default CategoryApi;
