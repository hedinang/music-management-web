/* eslint-disable no-unreachable */
/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import Cookies from 'js-cookie';
import { set } from 'lodash';
import qs from 'qs';
import { toast } from 'react-toastify';


export default class BaseApi {
    DEFAULT_TIMEOUT = 20000;
    BASE_URL = process.env.REACT_APP_BASE_API_URL || '';
    constructor() {
        this.$axiosInstance = this.initAxiosInstance();
    }
    /**
     * This method will config axios instance
     * If the request fails with a 401, then try to refresh the token and retry the request.
     *
     * @return The AxiosInstance is being returned.
     */
    initAxiosInstance() {
        const axiosInstance = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: false,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: this.DEFAULT_TIMEOUT,
        });
        axiosInstance.interceptors.request.use((request) => {
            const access_token = Cookies.get('access_token')
            if (!access_token) {
                return request;
            }
            set(request, 'headers.Authorization', `Bearer ${access_token}`);
            return request;
        });
        axiosInstance.interceptors.response.use(
            (response) => {
                if (response && response.data) {
                    return response.data;
                }
                return response;
            },
            async (error) => {
                const errorResponse = error.response;
                if (errorResponse && errorResponse.status === 401) {
                    localStorage.clear();
                    toast.error('IDまたはパスワードが正しくありません');
                    return
                }
                if (errorResponse && errorResponse.status === 500) {
                    toast.error('Server Error');
                    return
                }
                if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                    toast.error('Request timed out');
                    return
                }
                if (typeof (errorResponse?.data?.errors) !== 'string') {
                    if (typeof (errorResponse?.data) === 'object') {
                        throw {
                            status: errorResponse?.status,
                            message: errorResponse?.data,
                            success: false,
                        };
                    }
                    toast.error('Bad request !');
                    return
                } else {
                    toast.error(errorResponse?.data?.errors);
                    return
                }
            },
        );
        return axiosInstance;
    }

    /**
     * This function returns a promise that resolves to an AxiosResponse object.
     * Get method
     * @param path The path to the resource you want to retrieve.
     * @param params {
     * @return The return type is a Promise of an AxiosResponse.
     */
    get(path, params) {
        return this.$axiosInstance.get(path, {
            params,
        });
    }
    /**
     * A function that returns a promise.
     *  Post method
     * @param path string - The path to the endpoint you want to hit.
     * @param body any
     * @return The return type is a Promise of an AxiosResponse.
     */

    post(path, body, config) {
        const paramString = qs.stringify(config?.params, {
            arrayFormat: 'repeat',
            charset: 'utf-8',
        });
        const urlPost = paramString ? `${path}?${paramString}` : path;

        return this.$axiosInstance.post(urlPost, body, config);
    }

    /**
     * This function returns a promise that resolves to an AxiosResponse object that contains a generic
     * type T.
     *  Put method
     * @param path The path to the endpoint you want to hit.
     * @param body The body of the request.
     * @return The return type is a Promise of an AxiosResponse of type T.
     */
    put(path, body, config = {}) {
        return this.$axiosInstance.put(path, body, config);
    }

    /**
     * This function returns a promise that resolves to an AxiosResponse object.
     * Patch method
     * @param path The path to the endpoint you want to hit.
     * @param body The body of the request.
     * @return The return type is a Promise of an AxiosResponse of type T.
     */
    patch(path, body) {
        return this.$axiosInstance.patch(path, body);
    }

    /**
     * This function returns a promise that resolves to an AxiosResponse object that contains a generic
     * type T.
     * Delete method
     * @param path The path to the resource you want to access.
     * @return The return type is a Promise of an AxiosResponse of type T.
     */
    delete(path, config) {
        return this.$axiosInstance.delete(path, config);
    }

    deleteMany(path, body) {
        return this.$axiosInstance.delete(path, {
            data: body,
        });
    }
}
