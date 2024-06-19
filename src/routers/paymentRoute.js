import express from "express";
import {
    makePayment,
  getCashout,
  getTransactions,
  getEvents,
  getAccount,

} from "../controllers/paymentController";
import { protect } from "../middlewares/protect";
import { optionalProtect } from "../middlewares/optionalprotect";

const router = express.Router();
router.post('/cashin', makePayment);
router.post('/cashout', protect,getCashout);
router.get('/transactions', protect,getTransactions);
router.get('/events',protect, getEvents);
router.get('/account',protect, getAccount);
export default router;
