'use client';

import React, { useEffect } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/ajustes/mi-cuenta');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: '#fff',
      }}
    >
      <Row style={{ width: '100%', minHeight: '100vh' }}>
        {/* Columna izquierda - Formulario de login */}
        <Col
          xs={24}
          md={12}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            background: '#fff',
          }}
        >
          <div style={{ width: '100%', maxWidth: '450px' }}>
            <div style={{ marginBottom: '48px' }}>
              <Title level={2} style={{ marginBottom: '8px', fontSize: '32px', textAlign: 'center' }}>
                Iniciar sesión
              </Title>
            </div>
            
            <LoginForm />
            
            <div
              style={{
                marginTop: '32px',
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <Text strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Credenciales de prueba:
              </Text>
              <Text style={{ display: 'block', fontSize: '13px', color: '#666' }}>
                Email: mariana.manzo@empresa.com
              </Text>
              <Text style={{ display: 'block', fontSize: '13px', color: '#666' }}>
                Contraseña: Password123!
              </Text>
            </div>
          </div>
        </Col>

        {/* Columna derecha - Imagen */}
        <Col
          xs={0}
          md={12}
          style={{
            position: 'relative',
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/assets/home.png"
              alt="Login illustration"
              fill
              style={{
                objectFit: 'cover',
              }}
              priority
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
