#!/usr/bin/env node

const path = require('path');

console.log('🧪 测试组件导入架构...\n');

// 测试模块导入
try {
  console.log('📦 测试 module-a 导入...');
  const moduleA = require('../packages/module-a');
  console.log('✅ module-a 导入成功');
  console.log('   - 路由数量:', moduleA.routes?.length || 0);
  console.log('   - Store 配置:', moduleA.store ? '✅' : '❌');
  console.log('   - 配置信息:', moduleA.config?.name || 'N/A');
} catch (error) {
  console.log('❌ module-a 导入失败:', error.message);
}

try {
  console.log('\n📦 测试 module-b 导入...');
  const moduleB = require('../packages/module-b');
  console.log('✅ module-b 导入成功');
  console.log('   - 路由数量:', moduleB.routes?.length || 0);
  console.log('   - Store 配置:', moduleB.store ? '✅' : '❌');
  console.log('   - 配置信息:', moduleB.config?.name || 'N/A');
} catch (error) {
  console.log('❌ module-b 导入失败:', error.message);
}

console.log('\n🎯 架构特点:');
console.log('✅ 模块作为组件直接引入主项目');
console.log('✅ 使用动态路由加载模块路由');
console.log('✅ 模块可以访问主项目的 Vuex store');
console.log('✅ 支持独立开发和热更新');
console.log('✅ 不需要单独打包模块');

console.log('\n🚀 开发流程:');
console.log('1. 启动开发服务器: pnpm run dev');
console.log('2. 访问主应用: http://localhost:8082/');
console.log('3. 访问模块路由:');
console.log('   - /module-a/page1');
console.log('   - /module-a/page2');
console.log('   - /module-a/page3');
console.log('   - /module-b/dashboard');
console.log('   - /module-b/profile');
console.log('   - /module-b/settings');

console.log('\n✨ 架构优势:');
console.log('- 🔥 热更新: 修改任何模块组件都会自动重新编译');
console.log('- 📦 组件化: 模块作为组件直接引入，无需额外打包');
console.log('- 🔄 共享状态: 模块可以使用主项目的 Vuex store');
console.log('- 🎯 独立开发: 不同开发人员可以独立开发不同模块');
console.log('- ⚡ 快速构建: 生产环境只需构建主项目即可');