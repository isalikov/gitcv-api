import { HydratedDocument } from 'mongoose';

export const toResult = <T>(doc: HydratedDocument<T>): T => {
    const { _id, __v, ...obj } = doc.toJSON();

    return obj as T;
};
