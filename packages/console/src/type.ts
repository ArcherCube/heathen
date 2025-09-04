export type Log = {
  timestamp: number;
  source: {
    callerName?: string;
    filePath: string;
  };
  content: React.ReactNode;
  type: 'info' | 'warning' | 'error';
  children?: Log[];
};
