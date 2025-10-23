'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Avatar, Button, Divider, Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAuth } from '@/features/auth/AuthContext';
import ChangePasswordModal from './ChangePasswordModal';

const { Title, Text, Paragraph } = Typography;

export default function AccountInfo() {
  const { user } = useAuth();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <Title level={3} style={{ marginBottom: '24px' }}>
        Mi cuenta
      </Title>

      {/* Información general */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={5} style={{ marginBottom: '8px' }}>
          Información general
        </Title>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Avatar size={64} style={{ backgroundColor: '#BCBCBC', fontSize: '16px' }}>
            {user && getInitials(user.name)}
          </Avatar>
        </div>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                Nombre
              </Text>
              <Text>{user?.name}</Text>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                Email
              </Text>
              <Text>{user?.email}</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Contraseña */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <Title level={5} style={{ marginBottom: 0 }}>
            Contraseña
          </Title>
          <Button
            icon={<EditOutlined />}
            onClick={() => setPasswordModalOpen(true)}
          >
            Cambiar contraseña
          </Button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Columna izquierda - Contraseña */}
          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Contraseña
            </Text>
            <Text>********</Text>
          </div>
          
          {/* Columna derecha - Modificado por */}
          <div style={{ textAlign: 'right' }}>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Modificado por:
            </Text>
            <Text style={{ fontSize: '12px' }}>
              {user?.email} • 30 abril 2025, 13:41
            </Text>
          </div>
        </div>
      </Card>

      {/* Autenticación de dos factores */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Title level={5} style={{ marginBottom: '8px' }}>
              Autenticación de dos factores (2FA)
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Mantén tu cuenta extraprotegida con un segundo paso de inicio de sesión.
            </Paragraph>
          </div>
          <div style={{ marginLeft: '24px' }}>
            <Text type="secondary" style={{ fontSize: '12px', marginRight: '8px' }}>
              Desactivada
            </Text>
            <Switch disabled defaultChecked={false} />
          </div>
        </div>
      </Card>

      <ChangePasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}
