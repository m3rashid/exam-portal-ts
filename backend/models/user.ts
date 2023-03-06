import { Schema, model, ObjectId } from 'mongoose';

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

export interface IUser {
  _id: ObjectId;
  name: string;
  password: string;
  emailId: string;
  contact: string;
  type: IUserType;
  status: boolean;
  testIds: Array<ObjectId>;
}

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
