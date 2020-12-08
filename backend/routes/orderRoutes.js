import express from "express"
const router = express.Router()
import { createNewOrder, getOrderById, updateOrderToPayd } from "../controllers/orderControllers.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").post(protect, createNewOrder)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPayd)

export default router
