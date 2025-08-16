# Vue 2 Monorepo 优化方案

## 项目概述
这是一个基于 pnpm workspace 的 Vue 2 monorepo 项目，包含一个主应用（vue2-app）和两个独立模块（module-a 和 module-b）。

## 优化方案特点

### 1. 独立模块打包
- **module-a** 和 **module-b** 可以独立打包成 UMD 格式
- 支持开发环境和生产环境的不同加载策略
- 模块间完全解耦，可以独立开发和部署

### 2. 动态路由加载
- 开发环境：直接导入模块源码，支持热重载
- 生产环境：动态加载打包好的模块文件，减少首屏加载时间
- 支持按需加载，提升应用性能

### 3. CDN 优化
- 生产环境下使用 CDN 加载 Vue 和 VueRouter
- 减少应用包体积，提升加载速度
- 支持缓存策略，优化用户体验

## 项目结构

```
mono/
├── packages/
│   ├── module-a/          # 模块 A
│   │   ├── components/    # Vue 组件
│   │   ├── index.js       # 路由导出
│   │   ├── webpack.config.js  # Webpack 配置
│   │   └── package.json   # 模块配置
│   └── module-b/          # 模块 B
│       ├── components/    # Vue 组件
│       ├── index.js       # 路由导出
│       ├── webpack.config.js  # Webpack 配置
│       └── package.json   # 模块配置
├── projects/
│   └── vue2-app/         # 主应用
│       ├── src/
│       │   ├── router/    # 路由配置
│       │   ├── views/     # 页面组件
│       │   └── App.vue    # 主组件
│       ├── public/
│       │   └── modules/   # 模块打包文件存放位置
│       └── vue.config.js  # Vue CLI 配置
├── scripts/               # 构建脚本
│   ├── build-modules.js   # 模块构建脚本
│   └── clean.js          # 清理脚本
└── package.json          # 根项目配置
```

## 使用方法

### 1. 安装依赖
```bash
# 安装所有依赖
pnpm install

# 或者分别安装
pnpm install --filter vue2-app
cd packages/module-a && npm install
cd packages/module-b && npm install
```

### 2. 开发环境

#### 启动主应用
```bash
pnpm dev
# 或者
pnpm start
```

#### 开发模块（监听模式）
```bash
# 同时开发两个模块
pnpm dev:modules

# 或者单独开发某个模块
cd packages/module-a && npm run dev
cd packages/module-b && npm run dev
```

### 3. 生产构建

#### 构建所有模块
```bash
pnpm build:modules
```

#### 构建主应用
```bash
pnpm build:app
```

#### 构建所有项目
```bash
pnpm build:all
```

### 4. 清理构建文件
```bash
pnpm clean
```

## 技术实现

### 1. 模块独立打包
每个模块都有自己的 webpack 配置，打包成 UMD 格式：

```javascript
// webpack.config.js
module.exports = {
  output: {
    library: 'ModuleA',    // 暴露为全局变量
    libraryTarget: 'umd',  // UMD 格式
    globalObject: 'this', // 兼容多种环境
  },
  externals: {
    vue: 'Vue',           // 外部依赖
    'vue-router': 'VueRouter'
  }
}
```

### 2. 动态路由加载
根据环境动态选择加载策略：

```javascript
// 开发环境
const moduleA = await import('@mono/module-a')

// 生产环境
await loadScript('/modules/module-a.js')
const routes = window.ModuleA.routes
```

### 3. CDN 优化
生产环境下使用 CDN 加载核心依赖：

```html
<!-- public/index.html -->
<% if (process.env.NODE_ENV === 'production') { %>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.15/dist/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js"></script>
<% } %>
```

## 优势分析

### 1. 性能优化
- **按需加载**：模块只在需要时加载
- **CDN 加速**：核心依赖使用 CDN，利用浏览器缓存
- **代码分割**：每个模块独立打包，支持并行加载

### 2. 开发体验
- **独立开发**：模块可以独立开发和测试
- **热重载**：开发环境支持模块热重载
- **类型安全**：完整的 TypeScript 支持

### 3. 部署灵活
- **独立部署**：模块可以独立部署和更新
- **版本管理**：每个模块可以独立版本控制
- **回滚策略**：支持模块级别的回滚

## 扩展性

### 1. 添加新模块
1. 在 `packages/` 目录下创建新模块
2. 配置 `webpack.config.js` 和 `package.json`
3. 在主应用的路由配置中添加加载逻辑

### 2. 微前端架构
- 可以轻松扩展为微前端架构
- 支持不同框架的模块集成
- 支持模块的独立部署和运行

### 3. 服务端渲染
- 可以扩展支持服务端渲染
- 模块级别的 SSR 策略
- 支持静态站点生成

## 注意事项

1. **依赖管理**：确保模块间的依赖版本兼容
2. **路由冲突**：避免模块间的路由路径冲突
3. **样式隔离**：注意模块间的样式隔离问题
4. **全局变量**：谨慎使用全局变量，避免命名冲突

## 总结
这个优化方案提供了完整的模块化开发体验，支持独立开发、独立打包、动态加载等特性，是一个现代化的前端架构方案。