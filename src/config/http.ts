/*
 * @Description:
 * @Author: bb f
 * @Date: 2021-08-12 17:08:58
 * @LastEditors: bb f
 * @LastEditTime: 2021-11-29 14:08:05
 */
import axios, { AxiosRequestConfig as _AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { baseUrl } from '@/config/index';

// 可能需要自定义添加些配置
interface AxiosRequestConfig extends _AxiosRequestConfig {}

// 约束封装axios四个方法的对象
interface Http {
    get(url: string, data?: object): Promise<any>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<any>;
    put(url: string, data: object): Promise<any>;
    delete(url: string, data: object): Promise<any>;
}

// 约束方法名称数组
type HttpName = keyof Http;

// 方法名称数组，用于循环封装axios方法
const funArr: HttpName[] = ['get', 'post', 'put', 'delete'];

// axios 全局配置
const DEFAULT_CONFIG: AxiosRequestConfig = {
    timeout: 15 * 1000, // 超时
    // headers: {
    //     'Content-Type': 'application/json',
    // },
};

// 存储axiso封装的方法
const http = {};
// 遍历对axios四个主流方法封装
funArr.map((key: HttpName) => {
    // 断言当前http类型
    (<Http>http)[key] = (url: string, data: object, config?: AxiosRequestConfig) => {
        config &&
            Object.keys(config).forEach(key => {
                console.log((DEFAULT_CONFIG as any)[key], (config as any)[key]);

                (DEFAULT_CONFIG as any)[key] = (config as any)[key];
            });
        // 根据全局配置创建 axios 实例
        const instance = axios.create(DEFAULT_CONFIG);

        // 请求拦截器
        instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // 添加token
                // if (config.url?.includes(baseUrl.dev)) {
                //     config.headers!.accessToken = '';
                // }
                return config;
            },
            err => Promise.reject(err)
        );

        // 响应拦截器
        instance.interceptors.response.use(
            response => {
                // data 若是字符串 则需要解析
                // typeof response.data === 'string' && (response.data = JSON.parse(response.data));
                return response?.data || response;
            },
            err => {
                if (err.message.includes('timeout')) {
                    ElMessage.error('网络连接超时,请检查网络!');
                    return;
                }
                return Promise.reject(err);
            }
        );

        // 组织请求数据
        const requestData: AxiosRequestConfig = {
            method: key,
            url,
            // baseURL,
        };
        // 对请求中的 data 进行处理
        if (key === 'get') {
            requestData.params = data;
        } else {
            // 一般post采用FormData的形式发送数据
            requestData.data = data;
        }

        return instance
            .request(requestData)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    };
});

export default <Http>http;
