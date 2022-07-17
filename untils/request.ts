import axios, {AxiosInstance} from 'axios';
import  Message  from '../components/common/message/Message';
import * as config from '../config.js';
import { IS_DEV } from '../config.js';

const service: AxiosInstance = axios.create({
  baseURL: config.API_ROOT, // url = base url + request url
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers = {...config.headers,origin: IS_DEV ? 'http://localhost:3000' : 'https://a.codedogs.top' }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(

  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 0) {
      Message({
        message: res.message as string || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message as string ,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
