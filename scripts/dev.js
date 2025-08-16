const { spawn } = require('child_process')
const chalk = require('chalk')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const mainAppDir = path.join(rootDir, 'projects/vue2-app')

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    modules: [],
    mainOnly: false
  }
  
  for (const arg of args) {
    if (arg === '--main-only') {
      options.mainOnly = true
    } else if (arg === 'module-a' || arg === 'module-b') {
      options.modules.push(arg)
    } else if (arg === '--help' || arg === '-h') {
      showHelp()
      process.exit(0)
    }
  }
  
  // 如果没有指定模块且不是只启动主项目，默认启动所有模块
  if (options.modules.length === 0 && !options.mainOnly) {
    options.modules = ['module-a', 'module-b']
  }
  
  return options
}

function showHelp() {
  console.log(chalk.blue('📖 开发服务器使用说明'))
  console.log('')
  console.log(chalk.yellow('用法:'))
  console.log('  node scripts/dev.js [选项] [模块名...]')
  console.log('')
  console.log(chalk.yellow('选项:'))
  console.log('  --main-only     只启动主应用开发服务器')
  console.log('  --help, -h      显示帮助信息')
  console.log('')
  console.log(chalk.yellow('模块名:'))
  console.log('  module-a        启动模块A的监视构建')
  console.log('  module-b        启动模块B的监视构建')
  console.log('')
  console.log(chalk.yellow('示例:'))
  console.log('  node scripts/dev.js                     # 启动主应用和所有模块')
  console.log('  node scripts/dev.js --main-only         # 只启动主应用')
  console.log('  node scripts/dev.js module-a            # 启动主应用和模块A')
  console.log('  node scripts/dev.js module-a module-b   # 启动主应用和指定模块')
}

// 启动主应用开发服务器
function startMainApp() {
  console.log(chalk.blue('🚀 启动主应用开发服务器...'))
  
  const mainProcess = spawn('pnpm', ['run', 'serve'], {
    cwd: mainAppDir,
    stdio: 'inherit',
    shell: true
  })
  
  mainProcess.on('error', (error) => {
    console.error(chalk.red('❌ 主应用启动失败:'), error.message)
  })
  
  return mainProcess
}

// 启动模块监视构建
function startModuleWatch(moduleName) {
  console.log(chalk.yellow(`👀 启动 ${moduleName} 监视构建...`))
  
  const moduleDir = path.join(rootDir, 'packages', moduleName)
  const moduleProcess = spawn('pnpm', ['run', 'build:watch'], {
    cwd: moduleDir,
    stdio: 'inherit',
    shell: true
  })
  
  moduleProcess.on('error', (error) => {
    console.error(chalk.red(`❌ ${moduleName} 监视构建启动失败:`), error.message)
  })
  
  return moduleProcess
}

// 主函数
async function startDev() {
  const options = parseArgs()
  const processes = []
  
  console.log(chalk.blue('🔧 启动开发环境...'))
  console.log(chalk.gray(`选项: ${JSON.stringify(options, null, 2)}`))
  
  try {
    // 启动主应用
    const mainProcess = startMainApp()
    processes.push(mainProcess)
    
    // 等待一下让主应用先启动
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 启动模块监视构建
    if (options.modules.length > 0) {
      for (const moduleName of options.modules) {
        const moduleProcess = startModuleWatch(moduleName)
        processes.push(moduleProcess)
        
        // 模块之间间隔启动
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(chalk.green('\n✅ 开发环境启动完成!'))
    console.log(chalk.blue('📱 主应用地址: http://localhost:8081'))
    console.log(chalk.gray('按 Ctrl+C 停止所有服务'))
    
    // 监听退出信号
    process.on('SIGINT', () => {
      console.log(chalk.yellow('\n🛑 正在停止开发服务器...'))
      
      processes.forEach((proc, index) => {
        if (proc && !proc.killed) {
          proc.kill('SIGINT')
          console.log(chalk.gray(`  ✅ 进程 ${index + 1} 已停止`))
        }
      })
      
      console.log(chalk.blue('👋 开发服务器已停止'))
      process.exit(0)
    })
    
    // 保持进程运行
    await new Promise(() => {})
    
  } catch (error) {
    console.error(chalk.red('❌ 启动开发环境失败:'), error.message)
    
    // 清理进程
    processes.forEach(proc => {
      if (proc && !proc.killed) {
        proc.kill('SIGINT')
      }
    })
    
    process.exit(1)
  }
}

if (require.main === module) {
  startDev().catch(console.error)
}

module.exports = { startDev }