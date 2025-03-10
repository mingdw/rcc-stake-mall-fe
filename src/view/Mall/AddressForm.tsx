import React from 'react';
import { Form, Input, Modal, Radio, message } from 'antd';
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './AddressForm.module.scss';

interface AddressFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  initialValues?: any;
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
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      await onSubmit(values);
      form.resetFields();
      onCancel();
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
        initialValues={{ isDefault: false }}
      >
        <Form.Item
          name="name"
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

        <Form.Item
          name="address"
          label={<><EnvironmentOutlined /> 详细地址</>}
          rules={[{ required: true, message: '请输入详细地址' }]}
        >
          <Input.TextArea
            placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等"
            rows={3}
          />
        </Form.Item>

        <Form.Item name="isDefault" valuePropName="checked">
          <Radio>设为默认地址</Radio>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressForm;