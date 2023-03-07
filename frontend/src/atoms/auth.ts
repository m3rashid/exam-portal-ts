import { atom } from 'recoil';

export interface IAuth {
  isLoggedIn: boolean;
  user: any | null;
}

export const initialState: IAuth = {
  isLoggedIn: false,
  user: null,
};

export const authAtom = atom<IAuth>({
  key: 'auth',
  default: initialState,
});
