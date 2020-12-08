import express from "express"
const router = express.Router()
import { createNewOrder, getMyOrders, getOrderById, updateOrderToPaid } from "../controllers/orderControllers.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").post(protect, createNewOrder)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)

export default router
