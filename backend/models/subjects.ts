import { model, ObjectId, Schema } from 'mongoose';
import { IUser } from './user';

export interface ISubject {
  topic: string;
  createdBy?: ObjectId | IUser;
  status?: boolean;
}

export const subjectschema = new Schema<ISubject>({
  topic: {
    required: true,
    type: String,
    minlength: 2,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const SubjectModel = model<ISubject>('SubjectModel', subjectschema);
