import { authManager } from '../utils/authManager';
import axiosInstance from './axiosInstance';
import { message } from 'antd';
import { mockStakingPools } from './mockDatas';

// 基础属性接口
interface Attr {
  id: number;
  name: string;
  code: string;
  sort: number;
  status: number;
  type: number;
}

// 属性组接口
interface AttrGroup {
  id: number;
  name: string;
  code: string;
  status: number;
  type: number;
  sort: number;
  attrs: Attr[];
}

// 分类响应接口
interface CategoryResponse {
  id: number;
  name: string;
  code: string;
  level: number;
  sort: number;
  parentId: number;
  icon?: string;
  attrGroups?: AttrGroup[];
  children?: CategoryResponse[];
}

// 商品属性接口
interface ProductAttribute {
  basicAttrs: string;
  saleAttrs: string;
  specAttrs: string;
}

// 商品接口
interface Product {
  id: number;
  code: string;
  name: string;
  category1Id: number;
  category1Code: string;
  category2Id: number;
  category2Code: string;
  category3Id: number;
  category3Code: string;
  brand: string;
  price: number;
  realPrice: number;
  totalSales: number;
  totalStock: number;
  status: number;
  description: string;
  attributes: ProductAttribute;
  images: string[];
  tags: string[];
  skuList: ProductSku[];
}

// 分类商品接口
interface CategoryProduct {
  categoryId: number;
  categoryCode: string;
  categoryName: string;
  productCount: number;
  products: Product[] | null;
}

// 商品列表响应接口
interface ProductListResponse {
  total: number;
  categories: CategoryProduct[];
}

const getCurrentAddress = () => {
  // 如果没有地址，使用默认测试地址
  return authManager.address;
};
// 商品列表请求参数接口
interface ProductListRequest {
  categoryCodes: string;
  productName: string;
  page: number;
  pageSize: number;
}

// 商品明细请求接口参数
interface ProductDetailRequest {
  productId: number;
  productCode: string;
}


// 商品SKU接口
interface ProductSku {
  id: number;
  productSpuId: number;
  productSpuCode: string;
  skuCode: string;
  price: number;
  stock: number;
  saleCount: number;
  status: number;
  indexs: string;
  attrParams: string;
  ownerParams: string;
  images: string;
  title: string;
  subTitle: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
  creator: string;
  updator: string;
}

// 商品评价接口
interface ProductReview {
  id: number;
  user: {
    address: string;
    avatar: string;
  };
  rating: number;
  date: string;
  content: string;
  images: string[];
  specs: string;
}

// 商品SPU接口
interface ProductSpu {
  id: number;
  code: string;
  name: string;
  category1Id: number;
  category1Code: string;
  category2Id: number;
  category2Code: string;
  category3Id: number;
  category3Code: string;
  brand: string;
  price: number;
  realPrice: number;
  description: string;
  status: number;
  images: string[];
  totalSales: number;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
}

// 商品SPU详情接口
interface ProductSpuDetail {
  id: number;
  productSpuId: number;
  detail: string;
  packingList: string;
  afterSale: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
  creator: string;
  updator: string;
}

// 商品属性参数接口
interface ProductSpuAttrParams {
  id: number;
  productSpuId: number;
  basicAttrs: string; // JSON string
  saleAttrs: string; // JSON string
  specAttrs: string; // JSON string
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
  creator: string;
  updator: string;
}

// 商品详情响应接口
interface ProductDetailResponse {
  reviews: ProductReview[];
  productSpu: ProductSpu;
  productSku: ProductSku[];
  productSpuDetail: ProductSpuDetail;
  productSpuAttrParams: ProductSpuAttrParams;
}

interface ListAddressRequest{
  level: number;
  parentCode: string;
}

interface AddressResponse {
  addresses: Address[];
}

// 地址相关接口
 interface Address {
  id: number;
  code: string;
  name: string;
  parentCode: string;
  level: number;
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  districtCode: string;
  districtName: string;
  streetCode: string;
  streetName: string;
  fullAddress: string;
  postcode: string;
  sort: number;
  createdAt?: string;
  updatedAt?: string;
  creator?: string;
  updator?: string;
  isDeleted?: number;
  children?: Address[];
}


interface UserAddressListRequest {
  userId? : number;
  userCode? : string;
}

interface UserAddressListResponse {
  userAddress: UserAddress[];
}

interface UserAddress {
  id: number;
  userId: number;
  userCode: string;
  reciverName: string;
  reciverPhone: string;
  provinceCode: string;
	provinceName: string;
	cityCode: string;
	cityName: string;
	districtCode: string;
	districtName: string;
	streetCode: string;
	streetName: string;
  houseAddress: string;
	fullAddress: string;
	isDefault: number;
	longitude: string;
	latitude: string;
	isDeleted: number;
	creator: string;
	updator: string;
}

interface UserInfoResponse {
  id: number;
	uniqueId: string;
	userCode: string;
	nickname: string;
	avatar: string;
	gender: number;
	birthday: string;
	email: string;
	phone: string;
	password: string;
	status: number;
	statusDesc: string;
	type: number;
	typeDesc: string;
	isAdmin: boolean;
}

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
    const response = await axiosInstance.get('/suply',{
      headers: {
        'x-address': getCurrentAddress()
      }
    });
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
  } catch (error) {
    handleApiError(error, '检查管理员权限失败');
  }

};

// 获取用户信息
export const getUserInfo = async (address: string) : Promise<UserInfoResponse | null> => {
  try {
    const response = await axiosInstance.get(`/v1/user/${address}`);
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '获取用户信息失败');
    return null;
  }
};




// 获取分类列表
export const getCategoryList = async (): Promise<CategoryResponse[]> => {
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

// 获取商品列表
export const getProductList = async (params: ProductListRequest): Promise<ProductListResponse> => {
  try {
    const response = await axiosInstance.post('/v1/products', params);
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
    return {
      total: 0,
      categories: []
    };
  } catch (error) {
    handleApiError(error, '获取商品列表失败');
    return {
      total: 0,
      categories: []
    };
  }
};

// 获取商品详情
export const getProductDetail = async (params: ProductDetailRequest): Promise<ProductDetailResponse | null> => {
  try {
    const response = await axiosInstance.post('/v1/products/getProductDetails', params,{
      headers: {
        'x-address': getCurrentAddress()
      }
    });
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '获取商品详情失败');
    return null;
  }
};

// 提交订单
export const submitOrder = async (orderData: any) => {
  try {
    // 这里应该是实际的API调用
    // 目前使用模拟数据
    return {
      success: true,
      orderId: 'ORD' + Date.now(),
      message: '订单提交成功'
    };
  } catch (error) {
    console.error('提交订单失败:', error);
    return {
      success: false,
      message: '订单提交失败，请重试'
    };
  }
};



// 获取地址列表
export const getAddressList = async (params: ListAddressRequest) : Promise<AddressResponse> => {
  try {
    const response = await axiosInstance.post('/v1/address',  params, {
      headers: {
        'x-address': getCurrentAddress()
      }
    });
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
  } catch (error) {
    handleApiError(error, '获取省市区县数据失败');
  }
  return { addresses: [] };
};

export const getUserAddressList = async (params: UserAddressListRequest): Promise<UserAddress[]> => {
  try {
    const response = await axiosInstance.post('/v1/userAddress', params, {
      headers: {
        'x-address': getCurrentAddress()
      }
    });
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
  } catch (error) {
    handleApiError(error, '获取用户地址列表失败');
  }
   
  return []
} 



// 更新或者添加地址
export const addOrUpdateUserAddress = async (addressData: UserAddress) => {
  try {
    const response = await axiosInstance.post('/v1/userAddress/addAndUpdate', addressData, {
      headers: {
        'x-address': getCurrentAddress()
      }
    });
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
    throw new Error(response.data.message || '添加地址失败');
  } catch (error) {
    handleApiError(error, '添加地址失败');
    throw error;
  }
};


// 删除地址
export const deleteAddress = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/v1/userAddress/delete/${id}`);
    if (response.status === 200 && response.data.code === 0) {
      return true;
    }
    throw new Error(response.data.message || '删除地址失败');
  } catch (error) {
    handleApiError(error, '删除地址失败');
    throw error;
  }
};

// 设置默认地址
export const setDefaultAddress = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/v1/user/addresses/${id}/default`);
    if (response.status === 200 && response.data.code === 0) {
      return true;
    }
    throw new Error(response.data.message || '设置默认地址失败');
  } catch (error) {
    handleApiError(error, '设置默认地址失败');
    throw error;
  }
};

// 更新用户头像
export const updateUserAvatar = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post('/v1/user/avatar/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-address': getCurrentAddress()
      }
    });
    
    if (response.status === 200 && response.data.code === 0) {
      return {
        success: true,
        data: {
          avatarUrl: response.data.data.url
        }
      };
    }
    
    return {
      success: false,
      message: response.data.message || '上传头像失败'
    };
  } catch (error) {
    handleApiError(error, '上传头像失败');
    return {
      success: false,
      message: '网络错误，请稍后重试'
    };
  }
};

// 质押池管理相关API
export const getStakingPools = async () => {
  try {
    // 模拟API调用，返回模拟数据
    return Promise.resolve(mockStakingPools);
    // 实际API调用应该是：
    // const response = await axiosInstance.get('/staking-pools');
    // return response.data;
  } catch (error) {
    console.error('获取质押池列表失败:', error);
    throw error;
  }
};

export const getStakingPoolById = async (id: string) => {
  try {
    // 模拟API调用，从模拟数据中查找指定id的质押池
    const pool = mockStakingPools.find(pool => pool.id === id);
    if (pool) {
      return Promise.resolve(pool);
    }
    throw new Error('质押池不存在');
    // 实际API调用应该是：
    // const response = await axiosInstance.get(`/staking-pools/${id}`);
    // return response.data;
  } catch (error) {
    console.error(`获取质押池详情失败, id: ${id}:`, error);
    throw error;
  }
};

export const createStakingPool = async (poolData: any) => {
  try {
    // 模拟API调用，创建新质押池
    const newId = Date.now().toString();
    const newPool = { 
      ...poolData,
      id: newId 
    };
    return Promise.resolve(newPool);
    // 实际API调用应该是：
    // const response = await axiosInstance.post('/staking-pools', poolData);
    // return response.data;
  } catch (error) {
    console.error('创建质押池失败:', error);
    throw error;
  }
};

export const updateStakingPool = async (id: string, poolData: any) => {
  try {
    // 模拟API调用，更新质押池
    const updatedPool = { 
      ...poolData,
      id 
    };
    return Promise.resolve(updatedPool);
    // 实际API调用应该是：
    // const response = await axiosInstance.put(`/staking-pools/${id}`, poolData);
    // return response.data;
  } catch (error) {
    console.error(`更新质押池失败, id: ${id}:`, error);
    throw error;
  }
};

export const deleteStakingPool = async (id: string) => {
  try {
    // 模拟API调用，删除质押池
    return Promise.resolve({ success: true, message: '删除成功' });
    // 实际API调用应该是：
    // const response = await axiosInstance.delete(`/staking-pools/${id}`);
    // return response.data;
  } catch (error) {
    console.error(`删除质押池失败, id: ${id}:`, error);
    throw error;
  }
};

// 导出接口类型
export type {
  Attr,
  AttrGroup,
  CategoryResponse,
  Product,
  ProductSpu,
  ProductSku,
  ProductAttribute,
  CategoryProduct,
  ProductListResponse,
  ProductListRequest,
  ProductDetailResponse,
  Address,
  ListAddressRequest,
  AddressResponse,
  UserAddressListRequest,
  UserAddressListResponse,
  UserAddress,
  UserInfoResponse
};



