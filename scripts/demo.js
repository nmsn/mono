const chalk = require('chalk')
const { execSync } = require('child_process')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')

function showDemo() {
  console.log(chalk.blue('🎯 Monorepo 架构演示'))
  console.log('')
  
  console.log(chalk.yellow('📋 可用的命令:'))
  console.log('')
  
  console.log(chalk.green('开发模式:'))
  console.log('  pnpm dev                    # 启动完整开发环境（主应用 + 所有模块热更新）')
  console.log('  pnpm dev:main              # 只启动主应用')
  console.log('  pnpm dev:module-a          # 启动主应用 + 模块A热更新')
  console.log('  pnpm dev:module-b          # 启动主应用 + 模块B热更新')
  console.log('')
  
  console.log(chalk.green('构建模式:'))
  console.log('  pnpm build                 # 构建主应用和所有模块')
  console.log('  pnpm build:main            # 只构建主应用')
  console.log('  pnpm build:modules         # 只构建所有模块')
  console.log('  pnpm build:module-a        # 只构建模块A')
  console.log('  pnpm build:module-b        # 只构建模块B')
  console.log('  pnpm build:clean           # 清理后构建所有内容')
  console.log('  pnpm build:analyze         # 构建并分析产物大小')
  console.log('')
  
  console.log(chalk.green('高级命令:'))
  console.log('  node scripts/build-modules.js --help    # 查看构建脚本详细帮助')
  console.log('  node scripts/dev.js --help              # 查看开发脚本详细帮助')
  console.log('  node scripts/test-architecture.js       # 测试架构配置')
  console.log('')
  
  console.log(chalk.yellow('🏗️ 架构特性:'))
  console.log('  ✅ 动态路由加载 - 主项目自动加载模块路由')
  console.log('  ✅ 独立开发 - 每个模块可以独立开发和热更新')
  console.log('  ✅ 共享状态管理 - 模块可以访问主项目的 Vuex')
  console.log('  ✅ 选择性打包 - 可以选择特定模块进行打包')
  console.log('  ✅ 模块热更新 - 支持模块级别的热更新')
  console.log('  ✅ 构建缓存 - 复用已有构建产物加速打包')
  console.log('')
  
  console.log(chalk.yellow('📁 项目结构:'))
  console.log('  packages/module-a/         # 模块A（业务模块1）')
  console.log('  packages/module-b/         # 模块B（业务模块2）')
  console.log('  packages/shared-store/     # 共享状态管理')
  console.log('  projects/vue2-app/         # 主应用')
  console.log('  scripts/                   # 构建和开发脚本')
  console.log('')
  
  console.log(chalk.yellow('🚀 快速开始:'))
  console.log('  1. 安装依赖: pnpm install')
  console.log('  2. 启动开发: pnpm dev')
  console.log('  3. 访问应用: http://localhost:8081')
  console.log('')
  
  console.log(chalk.blue('📖 详细文档请查看: MONOREPO_ARCHITECTURE.md'))
}

function runQuickTest() {
  console.log(chalk.blue('\n🧪 运行快速测试...'))
  
  try {
    execSync('node scripts/test-architecture.js', { 
      cwd: rootDir, 
      stdio: 'inherit' 
    })
  } catch (error) {
    console.error(chalk.red('测试失败:'), error.message)
  }
}

function showProjectStatus() {
  console.log(chalk.blue('\n📊 项目状态:'))
  
  try {
    // 检查依赖安装状态
    const hasNodeModules = require('fs').existsSync(path.join(rootDir, 'node_modules'))
    console.log(`依赖安装: ${hasNodeModules ? chalk.green('✅ 已安装') : chalk.red('❌ 未安装')}`)
    
    // 检查模块构建状态
    const hasModuleBuilds = require('fs').existsSync(path.join(rootDir, 'projects/vue2-app/public/modules'))
    console.log(`模块构建: ${hasModuleBuilds ? chalk.green('✅ 已构建') : chalk.yellow('⚠️  未构建')}`)
    
    if (!hasNodeModules) {
      console.log(chalk.yellow('\n💡 请先运行: pnpm install'))
    }
    
    if (!hasModuleBuilds) {
      console.log(chalk.yellow('💡 可以运行: pnpm build:modules'))
    }
    
  } catch (error) {
    console.error(chalk.red('检查项目状态失败:'), error.message)
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--test')) {
    runQuickTest()
  } else if (args.includes('--status')) {
    showProjectStatus()
  } else {
    showDemo()
    
    if (args.includes('--full')) {
      showProjectStatus()
      runQuickTest()
    }
  }
}

if (require.main === module) {
  main()
}

module.exports = { showDemo, runQuickTest, showProjectStatus }