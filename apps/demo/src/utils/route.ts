import { RouteMatch } from '@tanstack/react-router';

type DefaultRouteMatch = RouteMatch<any, any, any, any, any, any, any>;

export const getRelativeKeysFromMatches = (matches: DefaultRouteMatch[]): string[] => {
  const pathname = matches[matches.length - 1]?.pathname;
  if (!pathname) {
    return [];
  }

  const originKeys = pathname.split('/');

  return originKeys.slice(1, originKeys.length - 1).reduce((store, current) => {
    const path = `${store[store.length - 1] || ''}/${current}`;
    return [...store, path];
  }, [] as string[]);
};
