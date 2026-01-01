import Razorpay from "razorpay";
import { RZP_KEY_ID_TEST, RZP_KEY_SECRET_TEST } from "../env-config.js";

export const razorpay = new Razorpay({
  key_id: `${RZP_KEY_ID_TEST}`,
  key_secret: `${RZP_KEY_SECRET_TEST}`,
});