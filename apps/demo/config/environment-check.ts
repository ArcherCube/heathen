import fs from 'fs';
import path from 'path';
import { ConfigEnv } from 'vite';

export const environmentCheck = (env: ConfigEnv) => {
  // 检查 .env 文件是否存在
  const envFile = path.resolve(process.cwd(), `.env.${env.mode}`);

  if (!fs.existsSync(envFile)) {
    throw new Error(`找不到 "${env.mode}" 对应的 .env 配置文件，请检查命令及环境配置！`);
  }
};
