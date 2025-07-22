import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, UserConfig } from 'vite';
import tsConfigPath from 'vite-tsconfig-paths';
import { calcChunkFileName, chunkConfig } from './chunk';
import { environmentCheck } from './environment-check';
import { getParamsFromArgv } from './get-argv';

export default defineConfig((config) => {
  environmentCheck(config);

  const params = getParamsFromArgv(process.argv) as { analyze: boolean };

  return {
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true, routeFileIgnorePattern: 'components' }),
      react({
        babel: {
          plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
        },
      }),
      tsConfigPath(),
      tailwindcss(),
      config.command === 'build' &&
        params.analyze &&
        visualizer({ filename: 'visualizer.html', gzipSize: true, brotliSize: true }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase', // 使用驼峰命名
        scopeBehaviour: 'local', // 模块化行为
        generateScopedName: '[name]__[local]___[hash:base64:5]', // 生成类名规则
      },
    },
    build: {
      chunkSizeWarningLimit: 200,
      rollupOptions: {
        output: {
          chunkFileNames: (info) => {
            return calcChunkFileName(info);
          },
          manualChunks: chunkConfig,
        },
      },
    },
  } satisfies UserConfig;
});
