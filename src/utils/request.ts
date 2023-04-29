/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-26 15:33:30
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-29 17:18:08
 * @FilePath: /React-Ant/src/utils/request.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { message, notification } from 'antd';
import { history } from 'umi';
import { extend } from 'umi-request';

/** 异常处理程序 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText =
      codeMessage[
        response.status as
          | 200
          | 201
          | 202
          | 204
          | 400
          | 401
          | 403
          | 404
          | 406
          | 410
          | 422
          | 500
          | 502
          | 503
          | 504
      ] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '网络异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

//对 extend 实例进行简单的封装
export const request = extend({
  prefix: '/api', // 统一的请求前缀
  timeout: 3000, // 超时时间
  headers: {
    // headers中搭载token等请求头信息
    Authentication: localStorage.getItem('token') || '',
  },
  //处理请求错误 调用上面的错误处理逻辑
  errorHandler: errorHandler,
});

// 对实例request进行请求拦截
// 可以在里面对url、option中的参数进行进一步处理
request.interceptors.request.use((url, options) => {
  return {
    options: {
      ...options,
      interceptors: true,
    },
  };
});

// 对实例request进行响应拦截, 统一处理接口错误信息
request.interceptors.response.use(async (response) => {
  if (response.status !== 200) {
    switch (response.status) {
      case 401:
        message.error('登录超时，请重新登陆!');
        history.push('/login');
        break;
    }
  }
  return response;
});
