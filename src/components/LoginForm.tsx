'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { login as loginApi } from '@/lib/mockAuth';
import { useAuth } from '@/features/auth/AuthContext';
import { validateEmail } from '@/lib/validators';

const { Text } = Typography;

export default function LoginForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setLoginError(false);
    try {
      const response = await loginApi(values);
      login(response.token, response.user);
      router.push('/ajustes/mi-cuenta');
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      size="large"
      requiredMark={false}
    >
      <Form.Item
        name="email"
        label="Correo"
        validateStatus={loginError ? 'error' : ''}
        rules={[
          { required: true, message: 'Correo electrónico' },
          {
            validator: (_, value) => {
              if (!value || validateEmail(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Por favor ingresa un correo válido'));
            },
          },
        ]}
      >
        <Input
          placeholder="Correo electrónico"
          type="email"
          status={loginError ? 'error' : ''}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        validateStatus={loginError ? 'error' : ''}
        rules={[{ required: true, message: 'Contraseña' }]}
      >
        <Input.Password
          placeholder="Contraseña"
          status={loginError ? 'error' : ''}
        />
      </Form.Item>

      {loginError && (
        <div
          style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#FFF1F0',
            borderRadius: '8px',
            border: '1px solid #FFCCC7',
          }}
        >
          <Text style={{ display: 'block', fontSize: '14px', color: '#000' }}>
            El correo electrónico o la contraseña son incorrectos.
            <br />
            Por favor, intenta nuevamente.
          </Text>
        </div>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
}
