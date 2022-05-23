# vite-start-page-app

## 前言

此目录为调试迁移到vite上面的分项目

完整的README在[这里](../start-page-app/README.md)

## 迁移记录

### 1. 安装wp2vite

```bash
npm install -g wp2vite
```

### 2. 去除冗余

> 生成的`vite.config.js`可能会有问题, 执行`yarn dev`后,
> 根据提示删除掉报错的内容即可, 目前还未有所影响。

### 3. 配置ElementPlus

生成的`vite.config.js`文件需要在`plugins`中插入以下内容: 

```js
// 省略导入其它插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// ...省略其它内容
plugins: [
  legacyPlugin({
    targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
  }), vuePlugin(),

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
],
// ...省略其它内容

```

> 参考[vite.config.js](./vite.config.js)

### 4. 运行测试

运行程序:

```badge
yarn start # 或者yarn dev
```
