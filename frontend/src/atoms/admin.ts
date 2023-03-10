import { atom } from 'recoil';

export type IMode = 'CREATE' | 'EDIT' | 'DELETE' | 'INFO';

export interface IAdmin {
  teacher?: {
    name: string;
    _id: string;
    contact: string;
    email: string;
    prefix: string;
    mode: IMode;
  };
  subject?: {
    _id: string;
    topic: string;
    mode: IMode;
  };
}

const initialAdminState: IAdmin = {};

export const adminAtom = atom<IAdmin>({
  key: 'admin',
  default: initialAdminState,
});
