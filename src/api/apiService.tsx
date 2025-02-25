import axiosInstance from './axiosInstance';
import { message } from 'antd';

// 统一的错误处理函数
const handleApiError = (error: any, customMessage?: string) => {
  if (error.response?.data?.message) {
    message.error(error.response.data.message);
  } else {
    message.error(customMessage || '系统异常，请稍后重试');
  }
  throw error;
};

// 获取质押币种列表
export const getSuplyList = async () => {
  try {
    const response = await axiosInstance.get('/suply');
    if (response.status === 200 && response.data.code === 0) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '获取质押币种列表失败');
  }
};

// 根据ID获取质押币种详情
export const getSuplyDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/suply/${id}`);
    if (response.status === 200 && response.data.code === 0) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '获取质押币种详情失败');
  }
};

// Ping服务器
export const pingServer = async () => {
  try {
    const response = await axiosInstance.get('/v1/ping');
    if (response.status === 200 && response.data.code === 0) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '服务器连接失败');
  }
};

// 判断是否为管理员
export const isAdmin = async (address: string) => {
  try {
    const response = await axiosInstance.get(`/isAdmin/${address}`);
    if (response.status === 200 && response.data.code === 0) {
      return response.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '检查管理员权限失败');
  }
};

// 获取分类列表
export const getCategoryList = async () => {
  try {
    const response = await axiosInstance.get('/v1/categories');
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data.categories;
    }
    return [];
  } catch (error) {
    handleApiError(error, '获取分类列表失败');
    return [];
  }
};



