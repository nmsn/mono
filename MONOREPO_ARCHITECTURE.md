# Monorepo 架构使用指南

## 项目概述

这是一个基于 Vue2 的 monorepo 项目架构，支持主项目和多个业务模块的独立开发、热更新和选择性打包。

## 架构特点

- ✅ **动态路由加载**：主项目通过动态路由加载各个业务模块
- ✅ **独立开发**：不同开发人员可以独立开发不同的模块
- ✅ **热更新支持**：主项目和各个模块都支持热更新
- ✅ **共享状态管理**：模块可以使用主项目的 Vuex，但各自有独立的状态管理
- ✅ **选择性打包**：可以选择不同的模块和主项目进行打包，复用已有生成物

## 项目结构

```
mono/
├── packages/                    # 业务模块包
│   ├── module-a/               # 模块A
│   │   ├── components/         # 组件
│   │   ├── index.js           # 模块入口
│   │   ├── package.json       # 模块依赖
│   │   └── webpack.config.js  # 模块构建配置
│   ├── module-b/               # 模块B
│   └── shared-store/           # 共享状态管理
├── projects/                   # 主项目
│   └── vue2-app/              # Vue2 主应用
│       ├── src/
│       │   ├── main.js        # 应用入口
│       │   ├── router/        # 路由配置
│       │   └── store/         # 状态管理
│       ├── public/
│       │   └── modules/       # 模块构建产物
│       └── vue.config.js      # 主应用构建配置
└── scripts/                   # 构建脚本
    ├── build-modules.js       # 模块构建脚本
    └── dev.js                # 开发服务器脚本
```

## 快速开始

### 1. 安装依赖

```bash
# 安装根目录依赖
pnpm install

# 安装所有包的依赖
pnpm install -r
```

### 2. 开发模式

#### 启动完整开发环境（推荐）
```bash
# 启动主应用和所有模块的热更新
node scripts/dev.js

# 或者使用 pnpm 脚本
pnpm dev
```

#### 启动特定模块开发
```bash
# 只启动主应用和模块A
node scripts/dev.js module-a

# 只启动主应用和模块B
node scripts/dev.js module-b

# 只启动主应用
node scripts/dev.js --main-only
```

### 3. 构建生产版本

#### 构建所有内容
```bash
# 构建主应用和所有模块
node scripts/build-modules.js --main --all

# 或者使用 pnpm 脚本
pnpm build
```

#### 选择性构建
```bash
# 只构建主应用
node scripts/build-modules.js --main

# 只构建特定模块
node scripts/build-modules.js module-a

# 构建主应用和特定模块
node scripts/build-modules.js --main module-a module-b

# 清理后构建
node scripts/build-modules.js --clean --main --all
```

## 开发指南

### 模块开发

每个模块都是一个独立的 Vue 应用，但不包含 Vue 实例的创建。模块需要导出以下内容：

```javascript
// packages/module-a/index.js
export default {
  name: 'ModuleA',
  routes: [/* 路由配置 */],
  store: {/* Vuex 模块配置 */},
  lifecycle: {/* 生命周期钩子 */},
  config: {/* 模块配置 */}
}
```

#### 路由配置
```javascript
export const routes = [
  {
    path: '/module-a/page1',
    name: 'ModuleAPage1',
    component: Page1,
    meta: {
      title: '模块A - 页面1',
      module: 'module-a'
    }
  }
]
```

#### Store 配置
```javascript
export const store = {
  namespaced: true,
  state: {/* 模块状态 */},
  getters: {/* 模块 getters */},
  mutations: {/* 模块 mutations */},
  actions: {/* 模块 actions */}
}
```

### 主项目开发

主项目负责：
- 提供首页和基础页面
- 动态加载和注册模块
- 管理共享状态
- 提供全局组件和服务

#### 访问共享状态
```javascript
// 在组件中访问共享状态
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
    sharedData() {
      return this.$store.getters.getSharedData('someKey')
    }
  },
  methods: {
    updateSharedData() {
      this.$store.dispatch('updateSharedData', { key: 'someKey', value: 'someValue' })
    }
  }
}
```

#### 模块间通信
```javascript
// 使用全局事件总线
this.$eventBus.$emit('module-a:data-changed', data)
this.$eventBus.$on('module-b:action-triggered', this.handleAction)
```

### 构建配置

#### 模块构建配置
每个模块都有独立的 webpack 配置，支持：
- UMD 格式输出
- 外部依赖排除（Vue、Vuex、Vue Router 等）
- 开发/生产模式
- 监视模式

#### 主应用构建配置
- 支持 CDN 外部依赖
- 代码分割优化
- 构建分析

## 部署指南

### 开发环境部署
1. 启动开发服务器：`node scripts/dev.js`
2. 访问 http://localhost:8081

### 生产环境部署
1. 构建所有内容：`node scripts/build-modules.js --main --all`
2. 部署 `projects/vue2-app/dist` 目录
3. 确保模块文件在 `/modules/` 路径下可访问

## 最佳实践

### 1. 模块设计原则
- **单一职责**：每个模块专注于特定的业务领域
- **松耦合**：模块间通过事件总线或共享状态通信
- **可复用**：模块应该可以在不同项目中复用

### 2. 状态管理
- **共享状态**：用户信息、应用配置等放在共享 store
- **模块状态**：业务特定的状态放在模块自己的 store
- **通信数据**：模块间通信的临时数据可以放在共享 store

### 3. 路由设计
- **命名空间**：每个模块的路由都有自己的前缀
- **懒加载**：使用动态导入实现路由懒加载
- **元信息**：在路由 meta 中标记模块信息

### 4. 构建优化
- **按需构建**：只构建变更的模块
- **缓存利用**：利用 webpack 缓存加速构建
- **代码分割**：合理分割代码减少包体积

## 故障排除

### 常见问题

1. **模块加载失败**
   - 检查模块构建是否成功
   - 确认模块文件路径正确
   - 查看浏览器控制台错误信息

2. **热更新不工作**
   - 确认开发服务器正在运行
   - 检查 webpack 监视模式是否启动
   - 重启开发服务器

3. **状态管理问题**
   - 确认模块 store 正确注册
   - 检查命名空间配置
   - 验证 action/mutation 调用路径

### 调试技巧

1. **开启详细日志**
   ```bash
   DEBUG=* node scripts/dev.js
   ```

2. **分析构建产物**
   ```bash
   node scripts/build-modules.js --analyze
   ```

3. **检查模块注册**
   ```javascript
   console.log(this.$moduleManager.loadedModules)
   ```

## 扩展指南

### 添加新模块

1. 在 `packages/` 下创建新模块目录
2. 创建模块的 `index.js`、`package.json`、`webpack.config.js`
3. 在构建脚本中添加新模块名称
4. 更新主项目的模块加载逻辑

### 自定义构建流程

可以通过修改 `scripts/build-modules.js` 来自定义构建流程，支持：
- 自定义构建步骤
- 集成测试流程
- 部署自动化

## 性能优化

### 构建性能
- 使用 webpack 缓存
- 并行构建多个模块
- 增量构建

### 运行时性能
- 路由懒加载
- 组件懒加载
- 代码分割

### 网络性能
- CDN 加速
- 资源压缩
- 缓存策略

---

更多详细信息请参考各个模块的 README 文档和源码注释。