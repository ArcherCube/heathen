import { Middleware, RouteContext } from './type';

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 */
const compose = (middleware: Middleware[]) => {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
  return (context: any, next?: Middleware) => {
    // last called middleware #
    let index = -1;
    const dispatch = (i: number): Promise<any> => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn: Middleware | undefined = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    };
    return dispatch(0);
  };
};

const middlewares: Array<Middleware> = [];

export const registerMiddlewares = (...targets: Middleware[]) => {
  for (let A = 0; A < targets.length; ++A) {
    if (!middlewares.includes(targets[A])) {
      middlewares.push(targets[A]);
    }
  }
};

export const execMiddlewares = (routeConfig: RouteContext) => {
  return compose(middlewares)(routeConfig);
};
