import { noop } from 'lodash-es';
import { isDev } from '../environment';
import dayjs from 'dayjs';

const DevOnly = (origin: (...args: any[]) => void) => {
  if (isDev) {
    return origin;
  }
  return noop;
};

const STATIC_INNER_PROPERTY = ['length', 'prototype', 'name'];

const originConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  group: console.group,
  groupEnd: console.groupEnd,
};

export class Logger {
  private static currentGroupName: string | undefined;
  private static currentGroupStartTimestamp: number | undefined;

  private static getCaller() {
    const lines = new Error().stack?.split('\n') ?? [];

    for (let A = 0; A < lines.length; ++A) {
      const line = lines[A].trim();
      const [_, caller] = line.split(' '); // ('at' [caller] from)

      if (!caller) {
        continue;
      }
      if (caller.includes('://')) {
        const [uri, rowIndex] = caller.slice(caller.indexOf('/', caller.indexOf('://') + './/'.length)).split(':');

        return `${uri.split('?')[0]}:${rowIndex}`;
      } else {
        const innerCallerNames = Object.getOwnPropertyNames(Logger).filter(
          (name) => !STATIC_INNER_PROPERTY.includes(name),
        );
        if (innerCallerNames.some((name) => caller === `${Logger.name}.${name}` || caller === `console.${name}`)) {
          continue;
        }
        return caller;
      }
    }

    return 'UNKNOWN';
  }

  @DevOnly
  private static output(type: keyof Pick<Console, 'log' | 'warn' | 'error'>, ...messages: any[]) {
    const functionName = Logger.getCaller();

    const prefix = `[${dayjs().format('HH:mm:ss:SSS')}][${functionName}]`;

    if (/%[sdifoOc]/.test(messages[0])) {
      originConsole?.[type]?.(`%s\n\n${messages[0]}`, prefix, ...messages.slice(1));
    } else {
      originConsole?.[type]?.(`%s`, prefix, ...messages);
    }
  }

  @DevOnly
  public static group(groupName: string) {
    Logger.currentGroupName = groupName;
    Logger.currentGroupStartTimestamp = Date.now();

    const startTextArr = [`GROUP START: ${Logger.currentGroupName}`];
    originConsole.group(`%c---- ${startTextArr.join(', ')} ----`, 'font-weight:bold');
  }

  @DevOnly
  public static groupEnd() {
    const endTextArr = [`GROUP END`];
    if (Logger.currentGroupStartTimestamp) {
      const duration = Date.now() - Logger.currentGroupStartTimestamp;
      endTextArr.push(`COST: ${(duration / 1000).toFixed(2)}s`);
    }
    originConsole.log(`%c${endTextArr.join(', ')}`, 'font-weight:bold');
    originConsole.groupEnd();
    Logger.currentGroupName = undefined;
  }

  @DevOnly
  public static log(...messages: any[]) {
    Logger.output('log', ...messages);
  }

  @DevOnly
  public static warn(...messages: any[]) {
    Logger.output('warn', ...messages);
  }

  @DevOnly
  public static error(...messages: any[]) {
    Logger.output('error', ...messages);
  }
}
