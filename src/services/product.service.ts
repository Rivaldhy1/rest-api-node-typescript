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

export const updateProductById = async (id: string, payload: productType) => {
  const result = await productModel.findOneAndUpdate(
    {
      product_id: id
    },
    { $set: payload }
  )

  return result
}

export const deleteProductById = async (id: string) => {
  const result = await productModel.findOneAndDelete({
    product_id: id
  })
  return result
}
