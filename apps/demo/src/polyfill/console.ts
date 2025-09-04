import { API } from '@heathen/console';
import { pick } from 'lodash-es';

// 覆盖 原生console
Object.assign(window.console, pick(API, ['error', 'warn', 'log', 'group', 'groupEnd']));
