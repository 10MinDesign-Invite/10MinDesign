"use client"
import axios from "axios";
import { useState } from "react";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";

export function usePayment(templateName:string) {
    const { Razorpay } = useRazorpay();
    const [isPaid,setPaid] = useState(false);

    const pay = async() => {
        const order = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/make/order`,{templateName},{ withCredentials: true })
        if (order.status === 200) {
            const options: RazorpayOrderOptions = {
                key: `${process.env.NEXT_PUBLIC_RZP_KEY_ID_TEST}`,
                amount: order.data.amount, // Amount in paise
                currency: "INR",
                name: "10MinDesign",
                description: "Test Transaction",
                image: "/logo-bg.png",
                order_id: order.data.order_id,
                handler: async (response) => {
                    const result = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/make/paymentverification`, 
                        { 
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                          amount:order.data.amount,
                          receipt:order.data.receipt,
                          templateName:templateName,
                          currency:order.data.currency  
                        }
                       ,{ withCredentials: true })
                    if(result.status === 200){
                        setPaid(true)
                    }
                },
                prefill: {
                    name: order.data.username,
                    email: order.data.email,
                    contact: order.data.phoneNo ?? "not specified",
                },
                theme: {
                    color: "#F37254",
                },
            };

            const razorpay = new Razorpay(options);
            razorpay.on('payment.failed', function (response) {
                toast.warn(response.error.reason)
            });
            razorpay.open();
        }
    }

    return {pay,isPaid}
}
