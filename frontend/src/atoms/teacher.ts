import { atom } from 'recoil';

export interface ITeacher {
  tableData: Array<any>;
  testTableData: Array<any>;
  searchText: string;
  tableLoadingStatus: boolean;
}

export const teacherInitialState: ITeacher = {
  tableData: [],
  testTableData: [],
  searchText: '',
  tableLoadingStatus: false,
};

export const teacherAtom = atom<ITeacher>({
  key: 'teacher',
  default: teacherInitialState,
});
