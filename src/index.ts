import express, { type Application, type NextFunction, type Request, type Response } from 'express'

const app: Application = express()
const port: number = 4040

app.use('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200', data: 'Hello' })
})

app.listen(port, () => {
  console.log(`Server is running  ${port}`)
})
