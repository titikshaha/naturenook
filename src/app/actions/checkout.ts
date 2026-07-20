"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import Razorpay from "razorpay";
import { auth } from "@/auth";

export async function createRazorpayOrder(
  totalAmount: number,
  guestDetails: { name: string; email: string; phone: string; address: string },
  cartItems: { id: string; name: string; price: number; quantity: number }[]
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return { success: false, error: "Razorpay keys not configured." };
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    // 1. Create Order in Razorpay
    const options = {
      amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    const razorpayOrder = await razorpay.orders.create(options);

    // 2. Create PENDING Order in our SQLite Database
    const dbOrder = await prisma.order.create({
      data: {
        userId: userId || null,
        totalAmount,
        status: "PENDING",
        guestName: guestDetails.name,
        guestEmail: guestDetails.email,
        guestPhone: guestDetails.phone,
        guestAddress: guestDetails.address,
        razorpayOrderId: razorpayOrder.id,
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            priceAtTime: item.price,
          })),
        },
      },
    });

    return {
      success: true,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        dbOrderId: dbOrder.id,
      },
    };
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return { success: false, error: error.message || "Failed to create order" };
  }
}

export async function verifyRazorpayPayment(
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string,
  dbOrderId: string
) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

    // 1. Verify the signature
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return { success: false, error: "Invalid payment signature." };
    }

    // 2. Signature is valid, update DB Order to PAID
    await prisma.order.update({
      where: { id: dbOrderId },
      data: {
        status: "PAID",
        razorpayPaymentId,
        razorpaySignature,
        transactionId: razorpayPaymentId, // standard field update
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return { success: false, error: "Payment verification failed." };
  }
}
