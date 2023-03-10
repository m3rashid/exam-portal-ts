import { atom } from 'recoil';
import { ISubject } from 'types/models';

export interface ISubjectAtom {
  tableData: Array<ISubject>;
  searchText: string;
  tableLoadingStatus: boolean;
}

const initialSubjectState: ISubjectAtom = {
  searchText: '',
  tableData: [],
  tableLoadingStatus: false,
};

export const subjectAtom = atom<ISubjectAtom>({
  key: 'subject',
  default: initialSubjectState,
});
