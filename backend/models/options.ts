import { model, Schema } from 'mongoose';
import { IOption } from 'types/models';

export const optionschema = new Schema<IOption>(
  {
    optBody: { required: false, type: String },
    optImg: { type: String, required: false, default: null },
    isAnswer: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const OptionsModel = model<IOption>('OptionsModel', optionschema);
