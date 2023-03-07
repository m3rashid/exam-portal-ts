import { atom } from 'recoil';

export interface IUi {
  collapsed: boolean;
}

export const initialState: IUi = {
  collapsed: true,
};

export const uiAtom = atom<IUi>({
  key: 'ui',
  default: initialState,
});
