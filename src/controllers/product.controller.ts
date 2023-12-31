import { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
  addProductToDb,
  deleteProductById,
  getProductById,
  getProductFromDb,
  updateProductById
} from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  try {
    await addProductToDb(value)
    logger.info('Success add new Product')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add product success' })
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const filteredData = await getProductById(id)
    if (filteredData) {
      logger.info('Success get Product data')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: filteredData
      })
    } else {
      return res.status(404).send({
        status: true,
        statusCode: 404,
        message: 'Data Not Found!',
        data: {}
      })
    }
  } else {
    const products: any = await getProductFromDb()
    logger.info('Success get Product data')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  try {
    const result = await updateProductById(id, value)

    if (result) {
      logger.info('Success update Product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'update product success' })
    } else {
      logger.info('Data Not Found!')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data Not Found!' })
    }
  } catch (error) {
    logger.error('ERR: product - update = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteProductById(id)

    if (result) {
      logger.info('Success delete Product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'delete product success' })
    } else {
      logger.info('Data Not Found!')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data Not Found!' })
    }
  } catch (error) {
    logger.error('ERR: product - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
