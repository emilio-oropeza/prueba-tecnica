import type { Metadata } from "next";
import { AntdRegistry } from '@/lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { AuthProvider } from '@/features/auth/AuthContext';
import { RouteGuard } from '@/features/auth/RouteGuard';
import "./globals.css";

export const metadata: Metadata = {
  title: "Configuración - Mi Cuenta",
  description: "Sistema de configuración de cuenta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AntdRegistry>
          <ConfigProvider
            locale={esES}
            theme={{
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 6,
              },
            }}
          >
            <AuthProvider>
              <RouteGuard>
                {children}
              </RouteGuard>
            </AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
