import { atom } from 'recoil';
import { IUserOptions } from 'services/userOptions';
import { IUser } from 'types/models';

export interface IAuth {
  isLoggedIn: boolean;
  user: (IUser & { userOptions: IUserOptions[] }) | null;
}

export const initialState: IAuth = {
  isLoggedIn: false,
  user: null,
};

export const authAtom = atom<IAuth>({
  key: 'auth',
  default: initialState,
});
