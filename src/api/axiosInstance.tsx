// src/api/axiosInstance.ts
import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL:  'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 如果响应成功但业务状态码不为0，显示错误信息
    if (response.data.code !== 0) {
      message.error(response.data.message || '系统异常，请稍后重试');
    }
    return response;
  },
  (error) => {
    let errorMessage = '系统异常，请稍后重试';
    
    if (error.response) {
      // 服务器返回错误状态码
      switch (error.response.status) {
        case 400:
          errorMessage = '请求参数错误';
          break;
        case 401:
          errorMessage = '用户未授权';
          break;
        case 403:
          errorMessage = '访问被禁止';
          break;
        case 404:
          errorMessage = '请求资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = `请求失败 (${error.response.status})`;
      }
    } else if (error.request) {
      // 请求发出但未收到响应
      errorMessage = '网络异常，请检查网络连接';
    } else {
      // 请求配置出错
      errorMessage = '请求配置错误';
    }

    // 显示错误消息
    message.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export default axiosInstance;