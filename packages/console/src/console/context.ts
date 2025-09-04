import { createContext, SetStateAction } from 'react';

export type ConsoleContextType = {
  open: boolean;
  setOpen: (v: SetStateAction<boolean>) => void;
};

export const ConsoleContext = createContext<ConsoleContextType>({
  open: false,
  setOpen: () => {},
});
