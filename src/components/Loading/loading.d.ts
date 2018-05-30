/// <reference types="react" />
import * as React from 'react';

export interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  style?: React.CSSProperties;
  type?: string;
  center?: boolean;
  children?: React.ReactNode;
}
