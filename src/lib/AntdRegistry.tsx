'use client';

import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';

export const AntdRegistry = ({ children }: { children: React.ReactNode }) => {
  return <StyleProvider hashPriority="high">{children}</StyleProvider>;
};
