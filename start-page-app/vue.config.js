const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6789
  },
  configureWebpack: {
    plugins: [
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
        autoInstall: true
      }),
    ]
  }
})
