'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { validatePassword, validatePasswordMatch } from '@/lib/validators';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    message.success('Contraseña actualizada');
    form.resetFields();
    onClose();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Cambiar contraseña"
      open={open}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Guardar"
      cancelText="Cancelar"
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="currentPassword"
          label="Contraseña actual"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña actual' }]}
        >
          <Input.Password placeholder="Ingresa tu contraseña actual" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Nueva contraseña"
          rules={[
            { required: true, message: 'Por favor ingresa tu nueva contraseña' },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const validation = validatePassword(value);
                if (validation.valid) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(validation.message));
              },
            },
          ]}
        >
          <Input.Password placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirmar contraseña"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Por favor confirma tu nueva contraseña' },
            {
              validator: (_, value) => {
                const newPassword = form.getFieldValue('newPassword');
                if (!value || validatePasswordMatch(newPassword, value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Las contraseñas no coinciden'));
              },
            },
          ]}
        >
          <Input.Password placeholder="Confirma tu nueva contraseña" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
