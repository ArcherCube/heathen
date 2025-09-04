import { Log } from '../type';
import { parseMessages } from './parse-messages';

type LogListener = (logHistory: Log[]) => void;

const STATIC_INNER_PROPERTY = ['length', 'prototype', 'name'];

export class API {
  private static logHistory: Log[] = [];
  private static groupStack: Log[] = [];
  private static listeners: Set<LogListener> = new Set();

  public static getLogHistory = () => {
    return API.logHistory;
  };

  public static addLogListener = (listener: LogListener) => {
    API.listeners.add(listener);
  };

  public static removeLogListener = (listener: LogListener) => {
    API.listeners.delete(listener);
  };

  /** --------------------------------------------------------------------------------- */

  private static getCaller = () => {
    const lines = new Error().stack?.split('\n') ?? [];

    for (let A = 2; A < lines.length; ++A) {
      const line = lines[A].trim();
      const splitedLine = line.split(' '); // ('at' [caller] from)
      let caller: string | undefined = undefined;
      let from: string | undefined = undefined;
      if (splitedLine.length === 2) {
        from = splitedLine[1];
      } else if (splitedLine.length === 3) {
        caller = splitedLine[1];
        from = splitedLine[2]?.slice(1, splitedLine[2].length - 2);
      }

      const innerCallerNames = Object.getOwnPropertyNames(API).filter((name) => !STATIC_INNER_PROPERTY.includes(name));
      if (innerCallerNames.some((name) => caller === `${API.name}.${name}` || caller === `console.${name}`)) {
        continue;
      }

      return {
        functionName: caller,
        fileName: from,
      };
    }

    return undefined;
  };

  private static emitListeners = () => {
    for (const listener of API.listeners) {
      listener(API.logHistory);
    }
  };

  private static pushLog = (info: Pick<Log, 'content' | 'type'>) => {
    const caller = API.getCaller();
    const log: Log = {
      ...info,
      timestamp: Date.now(),
      source: {
        callerName: caller?.functionName,
        filePath: caller?.fileName ?? 'UNKNOWN',
      },
    };

    if (!API.groupStack.length) {
      API.logHistory.push(log);
    } else {
      const parent = API.groupStack[API.groupStack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(log);
    }
    API.emitListeners();

    return log;
  };

  private static pushGroup(info: Pick<Log, 'content'> & Partial<Pick<Log, 'type'>>) {
    const log = API.pushLog({
      type: 'info',
      ...info,
    });
    API.groupStack.push(log);
  }

  public static clearLogHistory = () => {
    API.logHistory = [];
    API.emitListeners();
  };

  /** --------------------------------------------------------------------------------- */

  public static group(groupName: string) {
    API.pushGroup({
      content: groupName,
    });
  }

  public static groupEnd() {
    API.groupStack.pop();
  }

  public static log(...messages: any[]) {
    API.pushLog({ content: parseMessages(messages), type: 'info' });
  }

  public static warn(...messages: any[]) {
    API.pushGroup({ content: parseMessages(messages), type: 'warning' });

    const lines = new Error().stack?.split('\n').slice(2);
    if (lines) {
      for (let A = 0; A < lines.length; ++A) {
        API.pushLog({ content: lines[A], type: 'info' });
      }
    }
    API.groupEnd();
  }

  public static error(...messages: any[]) {
    API.pushGroup({ content: parseMessages(messages), type: 'error' });

    const lines = new Error().stack?.split('\n').slice(2);
    if (lines) {
      for (let A = 0; A < lines.length; ++A) {
        API.pushLog({ content: lines[A], type: 'info' });
      }
    }
    API.groupEnd();
  }
}
