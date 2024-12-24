import express from "express";
import adminAuth from "./../middleware/adminAuth.js";
import authUser from "./../middleware/auth.js";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderRazorpay,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
