import { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { getProductFromDb } from '../services/product.service'

interface productType {
  product_id: string
  name: string
  price: number
  size: string
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message} `)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  logger.info('Success add new Product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value })
}

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDb()

  const {
    params: { name }
  } = req

  if (name) {
    const filteredProduct = products.filter((product: productType) => {
      if (product.name === name) {
        return product
      }
    })

    if (filteredProduct.length === 0) {
      logger.info('data not found!')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        data: {}
      })
    }

    logger.info('Success get Product data')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filteredProduct[0]
    })
  }

  logger.info('Success get Product data')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: products
  })
}
