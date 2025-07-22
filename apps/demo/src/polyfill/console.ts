import { Logger } from '@heathen/utils';

// 覆盖 原生console
console.log = Logger.log;
console.error = Logger.error;
console.warn = Logger.warn;
console.group = Logger.group;
console.groupEnd = Logger.groupEnd;
