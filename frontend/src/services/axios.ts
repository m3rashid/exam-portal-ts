import axios from 'axios';
import auth from './auth';
import apis from './apis';

export const SecureGet = (p: any) => {
  return axios({
    method: 'get',
    baseURL: apis.BASE,
    ...p,
    params: {
      ...p.params,
      Token: auth.retriveToken(),
    },
  });
};

export const Get = (p: any) => {
  return axios({
    method: 'get',
    baseURL: apis.BASE,
    ...p,
  });
};

export const SecurePost = (p: any) => {
  return axios({
    method: 'post',
    baseURL: apis.BASE,
    ...p,
    params: {
      ...p.params,
      Token: auth.retriveToken(),
    },
  });
};

export const Post = (p: any) => {
  return axios({
    baseURL: apis.BASE,
    method: 'post',
    ...p,
  });
};
