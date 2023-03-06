import { Schema, model, ObjectId } from 'mongoose';
import { IQuestion } from './questions';
import { ISubject } from './subjects';
import { IUser } from './user';

export interface ITestPaper {
  _id: ObjectId;
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

export const testschema = new Schema<ITestPaper>({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QuestionModel',
      required: false,
    },
  ],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubjectModel',
      required: false,
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: Number,
    default: 1,
    required: false,
  },
  testBegins: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  isRegistrationAvailable: {
    type: Boolean,
    default: true,
    required: true,
  },
  testConducted: {
    type: Boolean,
    default: false,
    required: true,
  },
  isResultGenerated: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const TestPaperModel = model<ITestPaper>('TestPaperModel', testschema);
