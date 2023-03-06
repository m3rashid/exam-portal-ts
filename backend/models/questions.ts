import { model, ObjectId, Schema } from 'mongoose';
import { IOption } from 'models/options';
import { ISubject } from 'models/subjects';
import { IUser } from 'models/user';

export interface IQuestion {
  body: string;
  weightage?: number;
  ansCount?: number;
  isMcq?: boolean;
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

export const questionschema = new Schema<IQuestion>({
  body: { required: true, type: String },
  weightage: { type: Number, default: 1 },
  ansCount: { type: Number, default: 1 },
  isMcq: { type: Boolean, default: true },
  customAnswer: { type: String },
  options: [{ type: Schema.Types.ObjectId, ref: 'OptionsModel' }],
  explanation: { type: String },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'SubjectModel',
    required: true,
  },
  quesImg: { required: false, default: null, type: String },
  difficulty: { default: 0, type: Number },
  level: { required: true, type: String },
  school: { required: false, type: String },
  year: { required: false, type: String },
  topic: { required: false, type: String },
  component: { required: false, type: String },
  exam: { required: false, type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  status: { type: Boolean, default: true, required: true },
});

export const QuestionModel = model<IQuestion>('QuestionModel', questionschema);
