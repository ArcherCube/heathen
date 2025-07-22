import { BuildEnvironmentOptions } from 'vite';

type TypeOfArray<T> = T extends Array<infer R> ? R : T;

type OutputOptions = TypeOfArray<BuildEnvironmentOptions['rollupOptions']['output']>;

type ChunkFileNameFn = Exclude<OutputOptions['chunkFileNames'], string>;
export const calcChunkFileName: ChunkFileNameFn = (info) => {
  const { name: originName, exports: exportList, isDynamicEntry, facadeModuleId } = info;
  let chunkName = `assets/${originName}`;
  if (originName === 'index') {
    // 页面导出，按页面路径聚合
    if (exportList.length === 1 && exportList[0] === 'component' && isDynamicEntry) {
      const startTag = '/src/routes/';
      const endTag = 'index.tsx';
      const startTagIndex = facadeModuleId.indexOf(startTag);
      const endTagIndex = facadeModuleId.indexOf(endTag);
      if (~startTagIndex && ~endTagIndex) {
        const startIndex = startTagIndex + startTag.length;
        const endIndex = endTagIndex - 1;
        const chunkFileName = facadeModuleId
          .slice(startIndex, endIndex)
          .replaceAll('_main', 'main')
          .replaceAll('/', '_');

        chunkName = `pages/${chunkFileName}`;
      }
    } else {
      chunkName = `assets/vendor`;
    }
  }

  return `${chunkName}.[hash].js`;
};

type ChunkConfig = Exclude<OutputOptions['manualChunks'], (...args: never) => unknown>;
export const chunkConfig: ChunkConfig = {
  react: ['react', 'react-dom', 'react-dom/client'],
  icon: ['lucide-react'],
  router: ['@tanstack/react-router', '@heathen/middleware'],
  network: ['@tanstack/react-query', 'axios'],
  type: ['zod', '@tanstack/zod-adapter'],
  utils: [
    'clsx',
    'tailwind-merge',
    'react-is',
    'lodash-es',
    'dayjs',
    'ahooks',
    'zustand',
    '@heathen/utils',
    '@heathen/hooks',
    '@heathen/ui/lib/utils',
  ],
  chart: ['@heathen/ui/components/chart'],
  form: ['@heathen/ui/components/form'],
  toast: ['@heathen/ui/components/toast'],
  table: ['@heathen/ui/components/table', '@heathen/ui/components/data-table'],
  sidebar: ['@heathen/ui/components/sidebar'],
};
