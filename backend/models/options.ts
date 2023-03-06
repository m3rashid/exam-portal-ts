import { model, ObjectId, Schema } from 'mongoose';

export interface IOption {
  _id: ObjectId;
  optBody?: string;
  optImg?: string;
  isAnswer: boolean;
}

export const optionschema = new Schema<IOption>({
  optBody: {
    required: false,
    type: String,
  },
  optImg: {
    type: String,
    required: false,
    default: null,
  },
  isAnswer: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const OptionsModel = model<IOption>('OptionsModel', optionschema);