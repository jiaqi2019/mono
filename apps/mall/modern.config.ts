import path from 'path';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { koaPlugin } from '@modern-js/plugin-koa';
import { bffPlugin } from '@modern-js/plugin-bff';
// https://modernjs.dev/en/configure/app/usage

export default defineConfig({
  runtime: {
    router: true,
  },
  plugins: [appTools(), koaPlugin(), bffPlugin()],
  source: {
    include: [path.dirname(require.resolve('@modern-js/runtime'))],
  },
});
