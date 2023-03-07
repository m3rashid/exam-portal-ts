import { model, Schema } from 'mongoose';
import { ISubject } from 'types/models';

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
