import { atom } from 'recoil';

export interface ITeacher {
  tableData: Array<any>;
  searchText: string;
  tableLoadingStatus: boolean;
}

export const teacherInitialState: ITeacher = {
  tableData: [],
  searchText: '',
  tableLoadingStatus: false,
};

export const teacherAtom = atom<ITeacher>({
  key: 'teacher',
  default: teacherInitialState,
});
