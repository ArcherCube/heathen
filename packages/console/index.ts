import { ComponentProps } from 'react';
import { API as OriginApi } from './src/api';
import { Console as OriginConsole } from './src/console';

type APIType = Pick<typeof window.console, 'log' | 'warn' | 'error' | 'group' | 'groupEnd'>;

type Export = {
  Console: React.FC<ComponentProps<typeof OriginConsole>>;
  API: APIType;
};

const exportTarget: Export = {
  Console: () => null,
  API: {} as APIType,
};
if (process.env.NODE_ENV !== 'production') {
  exportTarget.Console = OriginConsole;
  exportTarget.API = OriginApi;
}

export const { Console, API } = exportTarget;
