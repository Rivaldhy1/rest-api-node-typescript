import { logger } from '../utils/logger'
import productModel from '../models/product.model'

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
