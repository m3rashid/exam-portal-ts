import { ObjectId } from 'mongoose';

export type IdType = ObjectId;

export interface BaseModel {
  _id: ObjectId;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAnswer extends BaseModel {
  questionId: string;
  customAnswer: string;
  chosenOption: Array<ObjectId | IOption>;
  userId: ObjectId | IUser;
}

export interface IAnswerSheet extends BaseModel {
  startTime: number;
  testId: ObjectId | ITestPaper;
  userId: ObjectId | IUser;
  questions: Array<ObjectId | IQuestion>;
  answers: Array<ObjectId | IAnswer>;
  completed: boolean;
}

export interface IFeedback extends BaseModel {
  feedback?: string;
  rating?: number;
  userId: ObjectId | IUser;
  testId: ObjectId | ITestPaper;
}

export interface IOption extends BaseModel {
  optBody?: string;
  optImg?: string;
  isAnswer: boolean;
}

export interface IQuestion extends BaseModel {
  body: string;
  weightage: number;
  ansCount: number;
  isMcq: boolean;
  customAnswer?: string;
  options: Array<ObjectId | IOption>;
  explanation?: string;
  subject: ObjectId | ISubject;
  quesImg?: string;
  difficulty?: number;
  level: string;
  school?: string;
  year?: string;
  topic?: string;
  component?: string;
  exam?: string;
  createdBy?: ObjectId | IUser;
  status: boolean;
}

export interface IResult extends BaseModel {
  testId: ObjectId | ITestPaper;
  userId: ObjectId | IUser;
  answerSheetId: ObjectId | IAnswerSheet;
  result: Array<ObjectId | ISubResult>;
  score?: number;
}

export interface ISubject extends BaseModel {
  topic: string;
  createdBy?: ObjectId | IUser;
  status?: boolean;
}

export interface ISubResult extends BaseModel {
  qId: ObjectId | IQuestion;
  explanation?: string;
  correctAnswer: Array<string>;
  givenAnswer: Array<string>;
  weightage: number;
  isCorrect?: boolean;
}

export interface ITestPaper extends BaseModel {
  type: string;
  title: string;
  questions?: Array<ObjectId | IQuestion>;
  subjects?: Array<ObjectId | ISubject>;
  duration: number;
  difficulty?: number;
  testBegins: boolean;
  status: boolean;
  createdBy?: ObjectId | IUser;
  isRegistrationAvailable: boolean;
  testConducted: boolean;
  isResultGenerated: boolean;
}

export const userTypes = {
  teacher: 'TEACHER',
  student: 'STUDENT',
  admin: 'ADMIN',
  other: 'OTHER',
} as const;

export const userTypesList = [
  userTypes.teacher,
  userTypes.student,
  userTypes.admin,
  userTypes.other,
] as const;

export type IUserType = typeof userTypesList[number];

export interface IUser extends BaseModel {
  name: string;
  password: string;
  emailId: string;
  contact: string;
  type: IUserType;
  status: boolean;
  testIds: Array<ObjectId>;
}
