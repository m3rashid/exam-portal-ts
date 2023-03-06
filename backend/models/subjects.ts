import { model, ObjectId, Schema } from 'mongoose';
import { IUser } from 'models/user';

export interface ISubject {
  topic: string;
  createdBy?: ObjectId | IUser;
  status: boolean;
}

export const subjectschema = new Schema<ISubject>({
  topic: {
    required: true,
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export const SubjectModel = model<ISubject>('SubjectModel', subjectschema);
