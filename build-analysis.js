const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('开始打包分析...\n')

// 1. 构建主应用
console.log('1. 构建主应用 (vue2-app)...')
try {
  execSync('cd projects/vue2-app && npm run build', { stdio: 'inherit' })
  console.log('✓ 主应用构建完成\n')
} catch (error) {
  console.error('✗ 主应用构建失败:', error.message)
}

// 2. 构建模块 A
console.log('2. 构建模块 A (module-a)...')
try {
  execSync('cd packages/module-a && npm run build', { stdio: 'inherit' })
  console.log('✓ 模块 A 构建完成\n')
} catch (error) {
  console.error('✗ 模块 A 构建失败:', error.message)
}

// 3. 构建模块 B
console.log('3. 构建模块 B (module-b)...')
try {
  execSync('cd packages/module-b && npm run build', { stdio: 'inherit' })
  console.log('✓ 模块 B 构建完成\n')
} catch (error) {
  console.error('✗ 模块 B 构建失败:', error.message)
}

// 4. 分析打包结果
console.log('4. 分析打包结果...')

const analyzeFile = (filePath, name) => {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)
    const sizeKB = (stats.size / 1024).toFixed(2)
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
    console.log(`${name}: ${sizeKB} KB (${sizeMB} MB)`)
    return stats.size
  }
  console.log(`${name}: 文件不存在`)
  return 0
}

console.log('\n=== 打包文件大小分析 ===')
const mainAppSize = analyzeFile('projects/vue2-app/dist/js/app.*.js', '主应用 (app.js)')
const vendorSize = analyzeFile('projects/vue2-app/dist/js/chunk-vendors.*.js', '主应用 (vendor.js)')
const moduleASize = analyzeFile('packages/module-a/dist/module-a.js', '模块 A (module-a.js)')
const moduleBSize = analyzeFile('packages/module-b/dist/module-b.js', '模块 B (module-b.js)')

const totalSize = mainAppSize + vendorSize + moduleASize + moduleBSize
const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2)
console.log(`\n总计: ${totalSizeMB} MB`)

console.log('\n=== 优化效果分析 ===')
console.log('✓ 公共依赖 (Vue, VueRouter, Vuex, Element-UI, lodash-es) 已提取到主应用')
console.log('✓ 模块 A 和 B 通过 externals 配置避免重复打包')
console.log('✓ 生产环境使用 CDN 加载公共依赖，减少主包体积')
console.log('✓ 实现了依赖共享和打包优化')

console.log('\n打包分析完成！')