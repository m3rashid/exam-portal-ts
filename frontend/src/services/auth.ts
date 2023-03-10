import { IUser } from 'types/models';
import apis from './apis';
import { Get, Post } from './axios';

const authService = {
  retriveToken: () => {
    return localStorage.getItem('Token');
  },

  storeToken: (t: string) => {
    localStorage.setItem('Token', t);
  },

  deleteToken: () => {
    localStorage.removeItem('Token');
  },

  loginAuth: (
    emailId: IUser['emailId'],
    password: IUser['password'],
    type: IUser['type']
  ) => {
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
