import { Router } from 'express'
import { asyncHandler } from '../errors/handler'

const router = Router()

asyncHandler(
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'opa' })
  })
)

export default router
