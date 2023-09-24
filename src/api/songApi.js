/* eslint-disable @typescript-eslint/no-explicit-any */
import { SONG } from './apiConstant';
import BaseApi from './baseApi';

class SongApi extends BaseApi {
    getList(param) {
        param.type = 'CLIENT'
        return this.post(`${SONG}/list`, param);
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
        return this.post(`${SONG}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    // deleteRecord(id: string): Promise<DatabasesData> {
    //     return this.deleteMany<DatabasesData>(DBS, { id: [id] });
    // }
}
export default SongApi;
