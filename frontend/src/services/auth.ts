import apis from './apis';
import { Get, Post } from './axios';

const authService = {
  // let token: string | null = null;

  retriveToken: () => {
    localStorage.getItem('Token');
  },

  storeToken: (t: string) => {
    localStorage.setItem('Token', t);
  },

  deleteToken: () => {
    localStorage.removeItem('Token');
  },

  loginAuth: (emailId: string, password: string, type: string) => {
    return Post({
      url: apis.LOGIN,
      data: {
        emailId,
        password,
        type,
      },
    });
  },

  fetchAuth: (t: string) => {
    return Get({
      url: apis.GET_USER_DETAILS,
      params: {
        token: t,
      },
    });
  },
};

export default authService;
