import { Model, model } from 'mongoose'

import cvSchema from './schemas/cvSchema'
import userSchema from './schemas/userSchema'
import { MongooseCV, MongooseUser } from '../types'

export const CVModel = model<MongooseCV, Model<MongooseCV>>('User', cvSchema)
export const UserModel = model<MongooseUser, Model<MongooseUser>>('User', userSchema)
