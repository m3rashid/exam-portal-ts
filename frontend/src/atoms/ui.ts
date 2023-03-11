import { atom } from 'recoil';
import { IUserType } from 'types/models';

export interface IUi {
  collapsed: boolean;
  modal: {
    name: string;
    open: boolean;
    data: unknown | null;
    type: IUserType | 'TEST_DETAIL';
  };
}

export const initialState: IUi = {
  collapsed: true,
  modal: {
    data: null,
    open: false,
    name: '',
    type: 'OTHER',
  },
};

export const closeModalProps = { ...initialState.modal };

export const uiAtom = atom<IUi>({
  key: 'ui',
  default: initialState,
});
