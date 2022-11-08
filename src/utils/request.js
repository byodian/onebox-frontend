import axios from 'axios';
import { clearStorage, getStorageToken } from './auth';

axios.defaults.headers['Content-Type'] = 'application/json';

const instance = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

instance.interceptors.request.use((config) => {
  const token = getStorageToken();
  // eslint-disable-next-line no-param-reassign
  if (token) config.headers['x-access-token'] = token;

  return config;
}, (err) => Promise.reject(err));

instance.interceptors.response.use((res) => res.data, (err) => {
  const { code, message } = err.response.data;
  let customMessage;
  switch (code) {
    case 401:
      customMessage = message || '登陆过期，请重新登陆';
      // 清除缓存
      clearStorage();

      // 重新加载页面
      // setTimeout(() => {
      //   document.location.replace('/login');
      // }, 2000);
      break;
    default:
      customMessage = message || '服务器连接异常，请稍后再重试操作';
  }

  return Promise.reject(new Error(customMessage));
});

export default instance;
