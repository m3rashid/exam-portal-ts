import { model, Schema } from 'mongoose';

export interface ITest {}

export const testSchema = new Schema<ITest>({});

export const TestModel = model<ITest>('TestModel', testSchema);
