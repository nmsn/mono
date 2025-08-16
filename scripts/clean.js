const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const modules = ['module-a', 'module-b']
const rootDir = path.resolve(__dirname, '..')
const packagesDir = path.join(rootDir, 'packages')
const publicModulesDir = path.join(rootDir, 'projects/vue2-app/public/modules')
const appDistDir = path.join(rootDir, 'projects/vue2-app/dist')

async function clean() {
  console.log(chalk.blue('🧹 Cleaning build files and dependencies...'))
  
  // 清理模块的 node_modules 和 dist
  for (const module of modules) {
    const moduleDir = path.join(packagesDir, module)
    const nodeModulesDir = path.join(moduleDir, 'node_modules')
    const distDir = path.join(moduleDir, 'dist')
    
    if (await fs.pathExists(nodeModulesDir)) {
      await fs.remove(nodeModulesDir)
      console.log(chalk.yellow(`  🗑️  Removed ${module}/node_modules`))
    }
    
    if (await fs.pathExists(distDir)) {
      await fs.remove(distDir)
      console.log(chalk.yellow(`  🗑️  Removed ${module}/dist`))
    }
  }
  
  // 清理 public/modules
  if (await fs.pathExists(publicModulesDir)) {
    await fs.remove(publicModulesDir)
    console.log(chalk.yellow('  🗑️  Removed public/modules'))
  }
  
  // 清理 vue2-app 的 dist
  if (await fs.pathExists(appDistDir)) {
    await fs.remove(appDistDir)
    console.log(chalk.yellow('  🗑️  Removed projects/vue2-app/dist'))
  }
  
  console.log(chalk.green('\n✅ All build files cleaned successfully!'))
}

if (require.main === module) {
  clean().catch(console.error)
}

module.exports = { clean }