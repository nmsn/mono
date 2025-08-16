# 组件导入架构设计文档

## 架构概述

本项目采用 **组件导入架构**，将 module-a 和 module-b 作为组件直接引入主项目，而不是独立打包的模块。这种架构简化了构建流程，提高了开发效率。

## 核心特点

### ✅ 组件化引入
- 模块作为组件直接引入主项目
- 使用 `require()` 或 `import` 直接导入模块配置
- 无需额外的模块打包步骤

### ✅ 动态路由加载
- 主项目在启动时自动加载所有模块的路由配置
- 支持路由懒加载，提高首屏加载速度
- 路由配置集中管理，便于维护

### ✅ 共享状态管理
- 模块可以访问主项目的 Vuex store
- 每个模块有独立的 store 模块，避免状态冲突
- 支持模块间数据共享和通信

### ✅ 热更新支持
- 修改任何模块组件都会自动重新编译
- 开发体验流畅，无需手动重启服务
- 支持样式和逻辑的实时更新

## 项目结构

```
mono/
├── packages/                    # 业务模块
│   ├── module-a/               # 模块A
│   │   ├── index.js           # 模块导出配置
│   │   └── components/        # 模块组件
│   ├── module-b/               # 模块B
│   │   ├── index.js           # 模块导出配置
│   │   └── components/        # 模块组件
│   └── shared-store/           # 共享状态管理
├── projects/
│   └── vue2-app/              # 主应用
│       ├── src/
│       │   ├── router/        # 路由配置
│       │   ├── store/         # 状态管理
│       │   └── main.js        # 应用入口
│       └── vue.config.js      # Webpack配置
└── scripts/                    # 构建脚本
```

## 模块导出格式

每个模块通过 `index.js` 导出标准化的配置：

```javascript
// packages/module-a/index.js
const routes = [
  {
    path: '/module-a/page1',
    name: 'ModuleAPage1',
    component: () => import('./components/Page1.vue'),
    meta: { title: '模块A - 页面1', module: 'module-a' }
  }
  // ... 更多路由
];

const store = {
  namespaced: true,
  state: { /* 模块状态 */ },
  mutations: { /* 模块mutations */ },
  actions: { /* 模块actions */ }
};

const config = {
  name: 'module-a',
  version: '1.0.0',
  description: '模块A - 业务模块示例'
};

module.exports = { routes, store, config };
```

## 主项目集成

### 路由集成

```javascript
// projects/vue2-app/src/router/index.js
const loadModuleRoutes = () => {
  try {
    const moduleARoutes = require('@mono/module-a').routes || []
    const moduleBRoutes = require('@mono/module-b').routes || []
    return [...moduleARoutes, ...moduleBRoutes]
  } catch (error) {
    console.error('Failed to load module routes:', error)
    return []
  }
}

const routes = [...baseRoutes, ...loadModuleRoutes()]
```

### Store 集成

```javascript
// projects/vue2-app/src/store/index.js
let moduleAStore = null
let moduleBStore = null

try {
  const moduleA = require('@mono/module-a')
  moduleAStore = moduleA.store
} catch (error) {
  console.warn('Failed to load module-a store:', error)
}

const store = new Vuex.Store({
  // 主应用状态
  state: { /* ... */ },
  modules: {
    ...(moduleAStore && { 'module-a': moduleAStore }),
    ...(moduleBStore && { 'module-b': moduleBStore })
  }
})
```

## 开发流程

### 1. 启动开发环境

```bash
# 启动开发服务器
pnpm run dev

# 访问应用
open http://localhost:8082/
```

### 2. 模块路由访问

- 主应用首页: `/`
- 关于页面: `/about`
- 模块A页面: `/module-a/page1`, `/module-a/page2`, `/module-a/page3`
- 模块B页面: `/module-b/dashboard`, `/module-b/profile`, `/module-b/settings`

### 3. 开发体验

- ✅ **热更新**: 修改任何组件文件会自动重新编译
- ✅ **实时预览**: 浏览器自动刷新显示最新更改
- ✅ **错误提示**: 编译错误会在浏览器中显示
- ✅ **独立开发**: 不同开发人员可以同时开发不同模块

## 构建部署

### 开发环境构建

```bash
# 启动开发服务器（已包含热更新）
pnpm run dev
```

### 生产环境构建

```bash
# 构建主应用（包含所有模块）
pnpm run build

# 构建产物位于 projects/vue2-app/dist/
```

## 架构优势

### 🚀 开发效率
- **简化构建**: 无需单独打包模块，减少构建复杂度
- **快速启动**: 开发服务器启动速度快
- **实时反馈**: 代码更改立即生效

### 🔧 维护性
- **统一管理**: 所有模块在同一个项目中管理
- **依赖共享**: 模块共享主项目的依赖，减少重复
- **版本一致**: 避免模块间版本冲突

### 🎯 扩展性
- **模块化设计**: 新增模块只需添加到 packages/ 目录
- **路由自动加载**: 新模块的路由会自动集成
- **状态隔离**: 每个模块有独立的状态管理

### ⚡ 性能优化
- **代码分割**: 使用动态导入实现组件懒加载
- **共享资源**: 模块共享 Vue、Vuex 等核心库
- **构建优化**: 单次构建包含所有功能

## 与传统架构对比

| 特性 | 组件导入架构 | 独立打包架构 |
|------|-------------|-------------|
| 构建复杂度 | ✅ 低 | ❌ 高 |
| 开发体验 | ✅ 优秀 | ⚠️ 一般 |
| 热更新 | ✅ 全支持 | ⚠️ 部分支持 |
| 部署复杂度 | ✅ 简单 | ❌ 复杂 |
| 资源共享 | ✅ 高效 | ❌ 重复 |
| 模块独立性 | ⚠️ 中等 | ✅ 高 |

## 最佳实践

### 1. 模块设计原则
- 保持模块功能内聚，减少模块间耦合
- 使用统一的导出格式和命名规范
- 合理设计模块的状态管理结构

### 2. 路由设计
- 使用模块前缀避免路由冲突
- 合理使用路由懒加载优化性能
- 添加适当的路由元信息

### 3. 状态管理
- 模块状态使用命名空间避免冲突
- 合理使用共享状态和模块状态
- 避免在模块间直接访问状态

### 4. 开发协作
- 不同开发人员负责不同模块
- 使用统一的代码规范和提交规范
- 定期同步和集成各模块的更改

## 总结

组件导入架构通过将模块作为组件直接引入主项目，实现了：

- ✅ **简化的构建流程**：无需复杂的模块打包配置
- ✅ **优秀的开发体验**：完整的热更新支持
- ✅ **高效的资源利用**：避免重复打包和加载
- ✅ **灵活的扩展能力**：易于添加新模块

这种架构特别适合团队协作开发，既保持了模块的独立性，又简化了整体的构建和部署流程。