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
  name: string;
  password: string;
  emailId: string;
  contact: string;
  avatar?: string;
  type: IUserType;
  status: boolean;
  createdBy?: ObjectId | IUser;
}

export const userschema = new Schema<IUser>({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
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
  avatar: {
    required: false,
    type: String,
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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
});

export const UserModel = model<IUser>('UserModel', userschema);
