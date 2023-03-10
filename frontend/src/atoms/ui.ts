import { atom } from 'recoil';

export const modalNames = [
  'REGISTER',
  'SAVE_CHANGES',
  'ADD_SUBJECT',
  'NEW_SUBJECT',
] as const;

export type IModalName = typeof modalNames[number];

export interface IUi {
  collapsed: boolean;
  modal: {
    name: IModalName | null;
    open: boolean;
    data: unknown | null;
  };
}

export const initialState: IUi = {
  collapsed: true,
  modal: {
    data: null,
    open: false,
    name: null,
  },
};

export const uiAtom = atom<IUi>({
  key: 'ui',
  default: initialState,
});
