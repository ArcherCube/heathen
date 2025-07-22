import React, { SetStateAction } from 'react';

export type LayoutConfig = {
  siderCollapsed?: boolean;
};

export type LayoutContextType = {
  layoutConfig: LayoutConfig | undefined;
  setLayoutConfig: (collapsed: SetStateAction<LayoutConfig | undefined>) => void;
  children?: React.ReactNode;
};

export const LayoutContext = React.createContext<LayoutContextType>({
  layoutConfig: {
    siderCollapsed: false,
  },
  setLayoutConfig: () => console.warn('[LayoutContext]: can not use a context outside the provider'),
});
