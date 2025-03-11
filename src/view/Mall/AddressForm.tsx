import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Radio, Select, Space, message } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './AddressForm.module.scss';
import type { Address, ListAddressRequest, UserAddress } from '../../api/apiService';
import { addOrUpdateUserAddress, getAddressList } from '../../api/apiService';

const { Option } = Select;

interface AddressFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  initialValues?: UserAddress | null;
  title?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  title = '添加收货地址'
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [addressData, setAddressData] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityOptions, setCityOptions] = useState<Address[]>([]);
  const [districtOptions, setDistrictOptions] = useState<Address[]>([]);
  const [streetOptions, setStreetOptions] = useState<Address[]>([]);

  // 获取省市区街道数据
  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        setLoading(true);
        const params: ListAddressRequest = {
          level: -1,
          parentCode: ''
        };
        const response = await getAddressList(params);
        if (response.addresses && response.addresses.length > 0) {
          setAddressData(response.addresses);
          
          // 如果有初始值，设置对应的市、区和街道数据
          if (initialValues?.provinceCode) {
            const selectedProvince = response.addresses.find(p => p.code === initialValues.provinceCode);
            if (selectedProvince?.children) {
              setCityOptions(selectedProvince.children);
              
              if (initialValues.CityCode) {
                const selectedCity = selectedProvince.children.find(c => c.code === initialValues.CityCode);
                if (selectedCity?.children) {
                  setDistrictOptions(selectedCity.children);
                  
                  if (initialValues.DistrictCode) {
                    const selectedDistrict = selectedCity.children.find(d => d.code === initialValues.DistrictCode);
                    if (selectedDistrict?.children) {
                      setStreetOptions(selectedDistrict.children);
                    }
                  }
                }
              }
            }
          }
        } else {
          message.error('地址数据为空，请联系管理员');
        }
      } catch (error) {
        message.error('获取地址数据失败');
      } finally {
        setLoading(false);
      }
    };
    
    if (visible) {
      fetchAddressData();
    }
  }, [visible, initialValues]);

  // 设置表单初始值
  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        Creator: initialValues.Creator,
        userCode: initialValues.userCode,
        provinceCode: initialValues.provinceCode,
        cityCode: initialValues.CityCode,
        districtCode: initialValues.DistrictCode,
        HouseAddress: initialValues.HouseAddress,
        IsDefault: initialValues.IsDefault === 1
      });
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  // 省份选择改变时
  const handleProvinceChange = (provinceCode: string) => {
    form.setFieldsValue({ 
      cityCode: undefined, 
      districtCode: undefined,
      streetCode: undefined
    });
    setDistrictOptions([]);
    setStreetOptions([]);
    
    const selectedProvince = addressData.find(p => p.code === provinceCode);
    if (selectedProvince?.children) {
      setCityOptions(selectedProvince.children);
    } else {
      setCityOptions([]);
    }
  };

  // 城市选择改变时
  const handleCityChange = (cityCode: string) => {
    form.setFieldsValue({ 
      districtCode: undefined,
      streetCode: undefined
    });
    setStreetOptions([]);
    
    const selectedProvince = addressData.find(p => p.code === form.getFieldValue('provinceCode'));
    const selectedCity = selectedProvince?.children?.find(c => c.code === cityCode);
    if (selectedCity?.children) {
      setDistrictOptions(selectedCity.children);
    } else {
      setDistrictOptions([]);
    }
  };

  // 区县选择改变时
  const handleDistrictChange = (districtCode: string) => {
    form.setFieldsValue({ 
      streetCode: undefined 
    });
    
    const selectedProvince = addressData.find(p => p.code === form.getFieldValue('provinceCode'));
    const selectedCity = selectedProvince?.children?.find(c => c.code === form.getFieldValue('cityCode'));
    const selectedDistrict = selectedCity?.children?.find(d => d.code === districtCode);
    if (selectedDistrict?.children) {
      setStreetOptions(selectedDistrict.children);
    } else {
      setStreetOptions([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      
      const selectedProvince = addressData.find(p => p.code === values.provinceCode);
      const selectedCity = cityOptions.find(c => c.code === values.cityCode);
      const selectedDistrict = districtOptions.find(d => d.code === values.districtCode);

      const submitData: UserAddress = {
        id: initialValues?.id || -1,
        userId: initialValues?.userId || -1,
        userCode: values.userCode || '0x324234',
        phone: values.phone,
        nickname: values.nickname,
        provinceCode: values.provinceCode,
        ProvinceName: selectedProvince?.name || '',
        CityCode: values.cityCode,
        CityName: selectedCity?.name || '',
        DistrictCode: values.districtCode,
        DistrictName: selectedDistrict?.name || '',
        StreetCode: values.streetCode,
        StreetName: selectedDistrict?.name || '',
        HouseAddress: values.houseAddress,
        FullAddress: `${values.nickname} +","+${values.phone} +","+${selectedProvince?.name || ''}+" "+${selectedCity?.name || ''}+" "+${selectedDistrict?.name || ''}+" "+${values.houseAddress}`,
        IsDefault: values.IsDefault ? 1 : 0,
        Longitude: '',
        Latitude: '',
        IsDeleted: 0,
        Creator: values.Creator,
        Updator: values.Creator
      };

      if (initialValues?.id!=-1) {
        await addOrUpdateUserAddress(submitData);
        message.success('更新地址成功');
      } else {
        await addOrUpdateUserAddress(submitData);
        message.success('添加地址成功');
      }
      
      form.resetFields();
      onSubmit();
    } catch (error) {
      console.error('提交地址表单失败:', error);
      message.error('提交失败，请检查表单信息');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={submitting}
      destroyOnClose
      className={styles.addressFormModal}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ IsDefault: false }}
      >
        <Form.Item
          name="nickname"
          label="收货人"
          rules={[{ required: true, message: '请输入收货人姓名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入收货人姓名" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="联系电话"
          rules={[
            { required: true, message: '请输入联系电话' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="请输入联系电话" />
        </Form.Item>

        <Form.Item label="所在地区" required>
          <div className="region-select-group">
            <Form.Item
              name="provinceCode"
              noStyle
              rules={[{ required: true, message: '请选择省份' }]}
            >
              <Select
                placeholder="省份"
                onChange={handleProvinceChange}
                loading={loading}
              >
                {addressData.map(province => (
                  <Option key={province.code} value={province.code}>{province.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="cityCode"
              noStyle
              rules={[{ required: true, message: '请选择城市' }]}
            >
              <Select
                placeholder="城市"
                onChange={handleCityChange}
                disabled={!form.getFieldValue('provinceCode')}
              >
                {cityOptions.map(city => (
                  <Option key={city.code} value={city.code}>{city.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="districtCode"
              noStyle
              rules={[{ required: true, message: '请选择区县' }]}
            >
              <Select
                placeholder="区县"
                onChange={handleDistrictChange}
                disabled={!form.getFieldValue('cityCode')}
              >
                {districtOptions.map(district => (
                  <Option key={district.code} value={district.code}>{district.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="streetCode"
              noStyle
              rules={[{ required: false, message: '请选择街道' }]}
            >
              <Select
                placeholder="街道"
                disabled={!form.getFieldValue('districtCode')}
              >
                {streetOptions.map(street => (
                  <Option key={street.code} value={street.code}>{street.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="houseAddress"
          label="详细地址"
          rules={[{ required: true, message: '请输入详细地址' }]}
        >
          <Input.TextArea
            placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等"
            rows={3}
          />
        </Form.Item>

        <Form.Item name="IsDefault" valuePropName="checked">
          <Radio>设为默认地址</Radio>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressForm;