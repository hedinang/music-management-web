
import { SONG } from './apiConstant';
import BaseApi from './baseApi';

class SongApi extends BaseApi {
    getList(param) {
        return this.post(`${SONG}/admin/list`, param);
    }
    getById(id) {
        if (id) {
            return this.get(`${SONG}/admin/${id}`);
        }
        return Promise.resolve(null);
    }
    update(param) {
        return this.put(`${SONG}/update`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    create(param) {
        return this.post(`${SONG}/add`, param, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    delete(idList){
        return this.post(`${SONG}/delete`, idList);
    }
}
export default SongApi;
