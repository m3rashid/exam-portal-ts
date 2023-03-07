import { Schema, model } from 'mongoose';
import { IUser, userTypes, userTypesList } from 'types/models';

export const userschema = new Schema<IUser>({
  name: {
    required: true,
    type: String,
    minlength: 3,
  },
  password: {
    required: true,
    minlength: 5,
    type: String,
  },
  emailId: {
    required: true,
    type: String,
    unique: true,
  },
  contact: {
    required: true,
    type: String,
    unique: true,
  },
  type: {
    required: true,
    type: String,
    enum: userTypesList,
    default: userTypes.teacher,
  },
  status: {
    required: true,
    default: true,
    type: Boolean,
  },
  testIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TestPaperModel',
    },
  ],
});

export const UserModel = model<IUser>('UserModel', userschema);
