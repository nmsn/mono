const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    static: {
      directory: path.join(__dirname, '../packages'),
      publicPath: '/modules'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@mono/module-a': path.resolve(__dirname, '../../packages/module-a'),
        '@mono/module-b': path.resolve(__dirname, '../../packages/module-b'),
        '@mono/shared-store': path.resolve(__dirname, '../../packages/shared-store')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }
    },
    externals: {
      // 生产环境下，将公共依赖作为外部依赖
      ...(process.env.NODE_ENV === 'production' ? {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        'element-ui': 'ELEMENT',
        'lodash-es': 'lodash'
      } : {})
    }
  },
  chainWebpack: (config) => {
    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].cdn = {
          css: [
            'https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/theme-chalk/index.css'
          ],
          js: [
            'https://cdn.jsdelivr.net/npm/vue@2.7.15/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/index.js',
            'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
          ]
        }
        return args
      })
    }
    
    // 分析模式配置
    if (process.env.ANALYZE) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugin('analyzer').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: 'bundle-stats.json'
      }])
    }
  }
})