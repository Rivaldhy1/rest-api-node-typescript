import userModel from '../models/user.model'
import userTypes from '../types/user.type'

export const createUser = async (payload: userTypes) => {
  return await userModel.create(payload)
}
