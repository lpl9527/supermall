//Vue全局配置
module.exports = {
  configureWebpack: {
      resolve: {
          extensions: [],   //配置的后缀引入时不需要写
          alias: {      //配置路径别名，@表示src已经默认配置了
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views'
          }
      }
  }
}