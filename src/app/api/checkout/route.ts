import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order.model";
import dbConnect from "@/lib/db";

export async function POST(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await dbConnect();
  const data = await request.json();
  if (!data) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }
  if (
    data.paymentMethod == "e-money" &&
    data.eMoneyNumber !== "" &&
    data.eMoneyPin !== ""
  ) {
    const order = new Order({
      billingDetails: data.billingDetails,
      shippingInfo: data.shippingInfo,
      paymentMethod: data.paymentMethod,
      orderValue: data.orderValue,
      shippingCost: data.shippingCost,
      grandTotal: data.grandTotal,
      items: data.items,
    });
    await order.save();
    return NextResponse.json(
      { message: "Order placed successfully" },
      { status: 200 },
    );
  }
  if (data.paymentMethod == "cash-on-delivery") {
    const order = new Order({
      billingDetails: data.billingDetails,
      shippingInfo: data.shippingInfo,
      paymentMethod: data.paymentMethod,
      orderValue: data.orderValue,
      shippingCost: data.shippingCost,
      grandTotal: data.grandTotal,
      items: data.items,
    });
    await order.save();
    return NextResponse.json(
      { message: "Order placed successfully" },
      { status: 200 },
    );
  }
  return NextResponse.json({ error: "Invalid data" }, { status: 400 });
}
