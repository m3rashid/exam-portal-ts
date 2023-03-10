import { atom } from 'recoil';

export interface IStudent {
  tableData: Array<any>;
  searchText: string;
  testDetails: {
    _id: string;
    minutesLeft: number;
    secondsLeft: number;
  } | null;
}

export const studentInitialState: IStudent = {
  tableData: [],
  searchText: '',
  testDetails: null,
};

export const studentAtom = atom<IStudent>({
  key: 'student',
  default: studentInitialState,
});
