import type { ProductListRequest } from '../../../../api/apiService';

// 销售属性和规格属性的接口
export interface AttributeItem {
  key: string;
  value: string;
}

// 规格组合类型定义
export interface SpecCombination {
  id: string;
  specs: Record<string, string>;
  price: number;
  stock: number;
  skuCode: string;
}

// 表单值类型
export interface ProductFormValues {
  name: string;
  code: string;
  price: number;
  realPrice: number;
  totalStock: number;
  status: boolean;
  description: string;
  categoryId?: string;
  brand?: string;
  tags?: string[];
  saleAttrs?: AttributeItem[];
  specAttrs?: { key: string; values: string[] }[];
  [key: string]: any; // 用于基础属性的动态字段
}

// 导出API原有类型的别名，便于统一引用方式
export type { ProductListRequest }; 