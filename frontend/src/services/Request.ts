import axios from 'axios';
import apis from './apis';

const base = apis.BASE;

let get = (uri: string, params: any = null) => {
  return axios({
    method: 'get',
    url: uri,
    baseURL: base,
    params: {
      Token: 't',
      ...params,
    },
  });
};

let post = (
  uri: string,
  params: any = null,
  data: any = null,
  others: any = {}
) => {
  return axios({
    method: 'get',
    url: uri,
    baseURL: base,
    params: {
      Token: 't',
      ...params,
    },
    data: data,
    ...others,
  });
};

module.exports = { get, post };
