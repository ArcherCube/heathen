import { type BeforeLoadContextOptions } from '@tanstack/react-router';

export type RouteContext = BeforeLoadContextOptions<any, any, any, any, any>;

export type Middleware = (routeContext: RouteContext, next: () => Promise<any>) => Promise<any>;
