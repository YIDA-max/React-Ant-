/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-29 11:01:04
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-29 16:43:19
 * @FilePath: /React-Ant/config/proxy.ts
 * @Description: 配置代理网络的文件
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // 如果需要自定义本地开发服务器  请取消注释按需调整
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: 'http://localhost:3333',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },

  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    // '/api/': {
    //   target: 'https://proapi.azurewebsites.net',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
