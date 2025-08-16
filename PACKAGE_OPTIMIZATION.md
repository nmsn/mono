# Element-UI 和 Lodash-es 打包优化方案

## 问题背景
在 monorepo 项目中，vue2-app、module-a 和 module-b 都依赖了相同的包（element-ui 和 lodash-es），导致重复打包，增加了整体包体积。

## 优化方案

### 1. 主应用 (vue2-app) 优化

#### 1.1 CDN 加载公共依赖
在 `vue.config.js` 中配置 externals，将公共依赖标记为外部依赖：

```javascript
externals: {
  ...(process.env.NODE_ENV === 'production' ? {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    'element-ui': 'ELEMENT',
    'lodash-es': 'lodash'
  } : {})
}
```

#### 1.2 CDN 资源配置
在 `vue.config.js` 中配置 CDN 链接：

```javascript
config.plugin('html').tap(args => {
  args[0].cdn = {
    css: [
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/theme-chalk/index.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.7.15/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/index.js',
      'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
    ]
  }
  return args
})
```

#### 1.3 HTML 模板优化
在 `public/index.html` 中添加 CDN 资源加载逻辑：

```html
<!-- CDN CSS Resources -->
<% if (process.env.NODE_ENV === 'production' && htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
  <% for (let css of htmlWebpackPlugin.options.cdn.css) { %>
    <link rel="stylesheet" href="<%= css %>">
  <% } %>
<% } %>

<!-- CDN JS Resources -->
<% if (process.env.NODE_ENV === 'production' && htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
  <% for (let js of htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= js %>"></script>
  <% } %>
<% } %>
```

### 2. 子模块 (module-a & module-b) 优化

#### 2.1 Webpack externals 配置
在 `webpack.config.js` 中配置 externals，避免重复打包：

```javascript
externals: {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  },
  'vue-router': {
    root: 'VueRouter',
    commonjs: 'vue-router',
    commonjs2: 'vue-router',
    amd: 'vue-router'
  },
  vuex: {
    root: 'Vuex',
    commonjs: 'vuex',
    commonjs2: 'vuex',
    amd: 'vuex'
  },
  'element-ui': {
    root: 'ELEMENT',
    commonjs: 'element-ui',
    commonjs2: 'element-ui',
    amd: 'element-ui'
  },
  'lodash-es': {
    root: 'lodash',
    commonjs: 'lodash-es',
    commonjs2: 'lodash-es',
    amd: 'lodash-es'
  }
}
```

#### 2.2 移除样式导入
在子模块的 `index.js` 中移除 element-ui 样式导入，因为通过 CDN 加载：

```javascript
// 移除这行
// import 'element-ui/lib/theme-chalk/index.css'

// 替换为注释
// element-ui 样式现在通过 CDN 加载，无需在此导入
```

### 3. 主应用入口优化
在 `main.js` 中移除 element-ui 样式导入：

```javascript
// 移除这行
// import 'element-ui/lib/theme-chalk/index.css'

// 只保留组件导入和注册
import ElementUI from 'element-ui'
Vue.use(ElementUI)
```

## 优化效果

### 1. 包体积优化
- **优化前**: 每个模块都包含完整的 element-ui 和 lodash-es，导致重复打包
- **优化后**: 公共依赖通过 CDN 加载，子模块只包含业务代码

### 2. 加载性能优化
- **CDN 加速**: 公共依赖通过 CDN 加载，利用浏览器缓存
- **并行加载**: 多个 CDN 资源可以并行加载
- **按需加载**: 子模块按需加载，减少首屏加载时间

### 3. 维护性优化
- **统一管理**: 公共依赖在主应用中统一管理
- **版本控制**: 通过 CDN 版本号统一控制依赖版本
- **更新便捷**: 更新公共依赖只需修改主应用配置

## 使用说明

### 1. 开发环境
```bash
# 启动开发环境
npm run dev
```

开发环境下，依赖仍然通过 npm 包加载，便于调试。

### 2. 生产环境
```bash
# 构建生产版本
npm run build
```

生产环境下，公共依赖通过 CDN 加载，减少包体积。

### 3. 打包分析
```bash
# 运行打包分析
node build-analysis.js
```

该脚本会自动构建所有模块并分析打包结果。

## 注意事项

1. **CDN 可用性**: 确保使用的 CDN 链接稳定可靠
2. **版本一致性**: 保持各模块使用的依赖版本一致
3. **网络环境**: 考虑网络环境对 CDN 加载的影响
4. **备用方案**: 建议准备 CDN 加载失败的备用方案

## 扩展建议

1. **本地缓存**: 可以考虑将 CDN 资源缓存到本地
2. **PWA 支持**: 结合 Service Worker 实现离线缓存
3. **按需加载**: 进一步优化 element-ui 的按需加载
4. **Tree Shaking**: 优化 lodash-es 的 tree shaking 效果