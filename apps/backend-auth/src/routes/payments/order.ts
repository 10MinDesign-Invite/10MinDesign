import { Request, Response, Router } from "express";
import { razorpay } from "../../config/rzp-config.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { RZP_KEY_SECRET_TEST } from "../../env-config.js";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import { prisma } from "@repo/database";


export const order: Router = Router();

order.post("/order", authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateName, category } = req.body;
        let amount = null;
        switch (category) {
            case "opening":
                amount =await prisma.opening.findUnique({
                    where: {
                        componentName: templateName
                    },
                    select: { price: true }
                })
                break;
            case "wedding":
                amount =await prisma.wedding.findUnique({
                    where: {
                        componentName: templateName
                    },
                    select: { price: true }
                })
                break;

            default:
                break;
        }
        if (!amount) {
            res.status(404).send("component Not found")
            return
        }
        var options = {
            amount: amount.price * 100,  // Amount is in currency subunits. 
            currency: "INR",
            receipt: "order_rcpt_id" + Date.now()
        };
        const data = await razorpay.orders.create(options);
        res.status(200).json({
            name: req.name,
            email: req.email,
            amount: data.amount,
            receipt: data.receipt,
            order_id: data.id,
            currency: data.currency
        });

    } catch (error) {
        console.log(error);
    }
})

order.post("/paymentverification", authMiddleware, async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, receipt, templateName, currency } = req.body;
        const varification = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, RZP_KEY_SECRET_TEST!);
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        if (varification && payment.status === "captured") {
            //db store
            await prisma.orders.create({
                data: {
                    email: req.email!,
                    amount,
                    receipt,
                    currency,
                    templateName,
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature
                }
            })
            res.cookie("purchased--" + templateName, receipt, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
                path: "/",
                secure: process.env.NODE_ENV !== "production" ? false : true,
                // domain: process.env.COOKIE_DOMAIN
            });
            res.status(200).send("payment success")

        } else {
            res.status(400).send("payment not from valid source")
        }
    } catch (error) {
        console.log(error);
    }
})
