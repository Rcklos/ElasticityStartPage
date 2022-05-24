import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    define: {
      'process.env.NODE_ENV': command === 'serve' ? '"development"' : '"production"'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 6789
    },
    plugins: [
      vue(),
      // 自动导入
      AutoImport({
        resolvers: [
          // 自动导入element组件
          ElementPlusResolver(),
        ]
      }),

      Components({
        resolvers: [
          // 自动注册element组件
          ElementPlusResolver(),

          // 自动注册图标
          IconsResolver({
            prefix: false,
            enabledCollections: ['ep']
          }),
        ],
      }),

      // 自动安装图标库
      Icons({
        autoinstall: true
      }),
    ]
  }
})
