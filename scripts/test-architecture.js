const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const rootDir = path.resolve(__dirname, '..')

async function testArchitecture() {
  console.log(chalk.blue('🧪 测试 Monorepo 架构...'))
  
  const tests = [
    {
      name: '检查项目结构',
      test: testProjectStructure
    },
    {
      name: '检查模块配置',
      test: testModuleConfigs
    },
    {
      name: '检查构建脚本',
      test: testBuildScripts
    },
    {
      name: '检查依赖关系',
      test: testDependencies
    }
  ]
  
  let passedTests = 0
  
  for (const { name, test } of tests) {
    console.log(chalk.yellow(`\n📋 ${name}...`))
    
    try {
      await test()
      console.log(chalk.green(`  ✅ ${name} 通过`))
      passedTests++
    } catch (error) {
      console.log(chalk.red(`  ❌ ${name} 失败: ${error.message}`))
    }
  }
  
  console.log(chalk.blue(`\n📊 测试结果: ${passedTests}/${tests.length} 通过`))
  
  if (passedTests === tests.length) {
    console.log(chalk.green('🎉 所有测试通过！架构配置正确。'))
  } else {
    console.log(chalk.red('⚠️  部分测试失败，请检查配置。'))
  }
}

async function testProjectStructure() {
  const requiredPaths = [
    'packages/module-a/index.js',
    'packages/module-b/index.js',
    'packages/shared-store/index.js',
    'projects/vue2-app/src/main.js',
    'projects/vue2-app/src/router/index.js',
    'projects/vue2-app/src/store/index.js',
    'scripts/build-modules.js',
    'scripts/dev.js'
  ]
  
  for (const filePath of requiredPaths) {
    const fullPath = path.join(rootDir, filePath)
    if (!await fs.pathExists(fullPath)) {
      throw new Error(`缺少必要文件: ${filePath}`)
    }
  }
}

async function testModuleConfigs() {
  const modules = ['module-a', 'module-b']
  
  for (const module of modules) {
    const moduleDir = path.join(rootDir, 'packages', module)
    
    // 检查 index.js
    const indexPath = path.join(moduleDir, 'index.js')
    const indexContent = await fs.readFile(indexPath, 'utf8')
    
    if (!indexContent.includes('export const routes')) {
      throw new Error(`${module}/index.js 缺少 routes 导出`)
    }
    
    if (!indexContent.includes('export const store')) {
      throw new Error(`${module}/index.js 缺少 store 导出`)
    }
    
    if (!indexContent.includes('export default')) {
      throw new Error(`${module}/index.js 缺少默认导出`)
    }
    
    // 检查 webpack.config.js
    const webpackPath = path.join(moduleDir, 'webpack.config.js')
    const webpackContent = await fs.readFile(webpackPath, 'utf8')
    
    if (!webpackContent.includes('libraryTarget: \'umd\'')) {
      throw new Error(`${module}/webpack.config.js 缺少 UMD 配置`)
    }
    
    // 检查 package.json
    const packagePath = path.join(moduleDir, 'package.json')
    const packageContent = await fs.readJson(packagePath)
    
    if (!packageContent.scripts || !packageContent.scripts['build:watch']) {
      throw new Error(`${module}/package.json 缺少 build:watch 脚本`)
    }
  }
}

async function testBuildScripts() {
  const buildScriptPath = path.join(rootDir, 'scripts/build-modules.js')
  const buildScriptContent = await fs.readFile(buildScriptPath, 'utf8')
  
  const requiredFunctions = [
    'parseArgs',
    'buildModule',
    'buildMainApp',
    'cleanBuildDirs'
  ]
  
  for (const func of requiredFunctions) {
    if (!buildScriptContent.includes(func)) {
      throw new Error(`构建脚本缺少函数: ${func}`)
    }
  }
  
  // 检查开发脚本
  const devScriptPath = path.join(rootDir, 'scripts/dev.js')
  const devScriptContent = await fs.readFile(devScriptPath, 'utf8')
  
  if (!devScriptContent.includes('startMainApp')) {
    throw new Error('开发脚本缺少 startMainApp 函数')
  }
  
  if (!devScriptContent.includes('startModuleWatch')) {
    throw new Error('开发脚本缺少 startModuleWatch 函数')
  }
}

async function testDependencies() {
  // 检查根目录 package.json
  const rootPackagePath = path.join(rootDir, 'package.json')
  const rootPackage = await fs.readJson(rootPackagePath)
  
  const requiredScripts = [
    'dev',
    'build',
    'build:modules',
    'build:main'
  ]
  
  for (const script of requiredScripts) {
    if (!rootPackage.scripts || !rootPackage.scripts[script]) {
      throw new Error(`根目录 package.json 缺少脚本: ${script}`)
    }
  }
  
  // 检查主应用 package.json
  const mainAppPackagePath = path.join(rootDir, 'projects/vue2-app/package.json')
  const mainAppPackage = await fs.readJson(mainAppPackagePath)
  
  const requiredDeps = ['vue', 'vue-router', 'vuex', 'element-ui']
  
  for (const dep of requiredDeps) {
    if (!mainAppPackage.dependencies || !mainAppPackage.dependencies[dep]) {
      throw new Error(`主应用缺少依赖: ${dep}`)
    }
  }
}

if (require.main === module) {
  testArchitecture().catch(console.error)
}

module.exports = { testArchitecture }