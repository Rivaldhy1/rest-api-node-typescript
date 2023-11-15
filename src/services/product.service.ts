import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import productType from '../types/product.type'

export const addProductToDb = async (payload: productType) => {
  return await productModel.create(payload)
}

export const getProductFromDb = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.info('cannot get data from DB')
      logger.error(err)
    })
}

export const getProductById = async (id: string) => {
  return await productModel.findOne({ product_id: id })
}
