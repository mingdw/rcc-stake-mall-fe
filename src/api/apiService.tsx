import axiosInstance from './axiosInstance';
import { message } from 'antd';

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

// 商品规格接口
interface ProductSpec {
  id: number;
  label: string;
  value: string;
}

// 商品SKU接口
interface ProductSku {
  id: number;
  code: string;
  price: number;
  originalPrice: number;
  stock: number;
  specs: Record<string, string>;
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
export interface ProductDetailResponse {
  reviews: ProductReview[];
  productSpu: ProductSpu;
  productSku: ProductSku[];
  productSpuDetail: ProductSpuDetail;
  productSpuAttrParams: ProductSpuAttrParams;
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
    const response = await axiosInstance.post('/v1/products/getProductDetails', params);
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    handleApiError(error, '获取商品详情失败');
    return null;
  }
};

// 导出接口类型
export type {
  Attr,
  AttrGroup,
  CategoryResponse,
  Product,
  ProductAttribute,
  CategoryProduct,
  ProductListResponse,
  ProductListRequest
};



