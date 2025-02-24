import axiosInstance from './axiosInstance';
import axios, { AxiosError } from 'axios';


// 示例接口：获取质押币种列表
export const getSuplyList = async () => {
  try {
    const response = await axiosInstance.get('/suply');
    if (response.status === 200 && response.data.code === 0) {
      return response.data;
    } else {
      throw new Error('Failed to fetch suply list');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 处理 AxiosError
      throw new Error(error.response?.data?.message || 'Failed to fetch suply list');
    } else {
      // 处理其他类型的错误
      throw new Error('An unexpected error occurred');
    }
  }
};

// 示例接口：根据ID获取质押币种详情
export const getSuplyDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/suply/${id}`);
    if (response.status === 200 && response.data.code === 0) {  
      return response.data;
    } else {
      throw new Error('Failed to fetch suply details');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch suply details');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// 新增示例接口：Ping
export const pingServer = async () => {
  try {
    const response = await axiosInstance.get('/v1/ping');
    if (response.status === 200 && response.data.code === 0) {  
      return response.data;
    } else {
      throw new Error('Failed to ping server');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to ping server');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

//接口：判断某个地址是不是管理员
export const isAdmin = async (address: string) => {
  const response = await axiosInstance.get(`/isAdmin/${address}`);
  if (response.status === 200 && response.data.code === 0) {
    return response.data;
  } else {
    throw new Error('Failed to check if address is admin');
  }
};  

export const getCategoryList = async () => {
  const response = await axiosInstance.get('/v1/categories');
  if (response.status === 200 && response.data.code === 0) {
    return response.data.data.categories;
  } else {
    throw new Error('Failed to fetch category list');
  } 
};



