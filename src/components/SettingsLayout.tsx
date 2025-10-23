'use client';

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';
import Image from 'next/image';

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  // Estado para controlar qué menús están expandidos
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    general: true, // General expandido por defecto
  });

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const selectedKey = pathname?.split('/').pop() || 'mi-cuenta';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Cerrar sesión',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          height: '64px',
        }}
      >
        {/* Logo a la izquierda */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '40px', position: 'relative' }}>
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        {/* Botones a la derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Botón de ayuda (?) */}
          <Button
            type="text"
            shape="circle"
            icon={<QuestionCircleOutlined style={{ fontSize: '18px' }} />}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />

          {/* Botón de configuración (engrane) */}
          <Button
            type="text"
            shape="circle"
            icon={<SettingOutlined style={{ fontSize: '18px' }} />}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />

          {/* Avatar con dropdown de cerrar sesión */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <Button
              type="text"
              shape="circle"
              style={{
                padding: 0,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                style={{
                  backgroundColor: '#1890ff',
                  cursor: 'pointer',
                }}
                size={32}
              >
                {user && getInitials(user.name)}
              </Avatar>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          width={250}
          style={{
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <div>
            {/* Título del sidebar */}
            <div
              style={{
                padding: '24px 24px 16px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#000',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              Configuración
            </div>

            <div style={{ paddingTop: '16px' }}>
              {/* General - con submenús */}
              <div>
                <div
                  style={{
                    padding: '12px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#000',
                  }}
                  onClick={() => toggleMenu('general')}
                >
                  <span>General</span>
                  {expandedMenus.general ? <MinusOutlined /> : <PlusOutlined />}
                </div>
                {expandedMenus.general && (
                  <div>
                    <div
                      style={{
                        padding: '10px 24px 10px 40px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'normal',
                        backgroundColor: selectedKey === 'mi-cuenta' ? '#f5f5f5' : 'transparent',
                        color: '#000',
                      }}
                      onClick={() => router.push('/ajustes/mi-cuenta')}
                    >
                      Mi cuenta
                    </div>
                    <div
                      style={{
                        padding: '10px 24px 10px 40px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'normal',
                        backgroundColor: selectedKey === 'usuarios' ? '#f5f5f5' : 'transparent',
                        color: '#000',
                      }}
                    >
                      Usuarios
                    </div>
                  </div>
                )}
              </div>

              {/* Seguridad y permisos - sin submenús */}
              <div>
                <div
                  style={{
                    padding: '12px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#000',
                  }}
                  onClick={() => toggleMenu('seguridad')}
                >
                  <span>Seguridad y permisos</span>
                  {expandedMenus.seguridad ? <MinusOutlined /> : <PlusOutlined />}
                </div>
                {expandedMenus.seguridad && (
                  <div
                    style={{
                      padding: '10px 24px 10px 40px',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      color: '#999',
                    }}
                  >
                    Sin submenús
                  </div>
                )}
              </div>

              {/* Módulos - sin submenús */}
              <div>
                <div
                  style={{
                    padding: '12px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#000',
                  }}
                  onClick={() => toggleMenu('modulos')}
                >
                  <span>Módulos</span>
                  {expandedMenus.modulos ? <MinusOutlined /> : <PlusOutlined />}
                </div>
                {expandedMenus.modulos && (
                  <div
                    style={{
                      padding: '10px 24px 10px 40px',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      color: '#999',
                    }}
                  >
                    Sin submenús
                  </div>
                )}
              </div>

              {/* Avanzado - sin submenús */}
              <div>
                <div
                  style={{
                    padding: '12px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#000',
                  }}
                  onClick={() => toggleMenu('avanzado')}
                >
                  <span>Avanzado</span>
                  {expandedMenus.avanzado ? <MinusOutlined /> : <PlusOutlined />}
                </div>
                {expandedMenus.avanzado && (
                  <div
                    style={{
                      padding: '10px 24px 10px 40px',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      color: '#999',
                    }}
                  >
                    Sin submenús
                  </div>
                )}
              </div>
            </div>
          </div>
        </Sider>
        <Content
          style={{
            padding: '24px',
            background: '#f5f5f5',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
