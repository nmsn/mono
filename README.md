# Monorepo with pnpm workspace

这是一个使用 pnpm workspace 管理的 monorepo 项目。

## 项目结构

```
mono/
├── projects/          # 存放项目
│   └── vue2-app/      # Vue 2 应用
├── packages/          # 存放组件仓库或函数库等配置
├── package.json       # 根 package.json
└── README.md          # 项目说明
```

## 安装依赖

```bash
pnpm install
```

## 开发

启动 Vue 2 应用：

```bash
pnpm --filter vue2-app serve
```

## 构建

构建所有项目：

```bash
pnpm build
```

构建特定项目：

```bash
pnpm --filter vue2-app build
```

## 工作空间配置

pnpm workspace 配置在根目录的 `package.json` 中：

```json
{
  "workspaces": [
    "projects/*",
    "packages/*"
  ]
}
```

## 添加新项目

1. 在 `projects/` 目录下创建新项目文件夹
2. 在新项目目录中创建 `package.json`
3. 运行 `pnpm install` 安装依赖

## 添加新包

1. 在 `packages/` 目录下创建新包文件夹
2. 在新包目录中创建 `package.json`
3. 运行 `pnpm install` 安装依赖