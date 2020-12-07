import express from "express"
const router = express.Router()
import { createNewOrder } from "../controllers/orderControllers.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").post(protect, createNewOrder)

export default router
