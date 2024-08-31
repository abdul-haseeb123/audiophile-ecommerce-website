"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Radio } from "./ui/radio";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-provider";
import { CldImage } from "next-cloudinary";
import { OrderConfirmationAlert } from "./order-confirmation-alert";
import { shortenProductName } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cashOnDeliverySchema, eMoneySchema } from "@/schemas";

// Function to refine phone number

const getSchema = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "e-money":
      return eMoneySchema;
    case "cash-on-delivery":
      return cashOnDeliverySchema;
    default:
      return cashOnDeliverySchema;
  }
};

export function CheckoutForm() {
  const [schema, setSchema] = useState<z.ZodObject<any>>(eMoneySchema);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { cart, getTotalCartValue, calculateVAT, shippingCost, getGrandTotal } =
    useCart();
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      paymentMethod: "e-money",
      eMoneyNumber: "",
      eMoneyPin: "",
    },
    resolver: zodResolver(schema),
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    setSchema(getSchema(paymentMethod));
  }, [paymentMethod]);

  function handleNumericChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Update value in React Hook Form state
      form.setValue(field.name, value, { shouldValidate: true });
    }
  }
  function handlePhoneNumberChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) {
    const value = e.target.value;
    if (/^[\d\s\-+]*$/.test(value)) {
      // Update value in React Hook Form state
      form.setValue(field.name, value, { shouldValidate: true });
    }
  }

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsDisabled(true);
    const totalCartValue = Math.floor(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    );
    const billingDetails = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    const shippingInfo = {
      address: values.address,
      zipCode: values.zipCode,
      city: values.city,
      country: values.country,
    };
    const data = JSON.stringify({
      billingDetails,
      shippingInfo,
      paymentMethod: values.paymentMethod,
      orderValue: totalCartValue,
      shippingCost,
      grandTotal: getGrandTotal(),
      eMoneyNumber: values.eMoneyNumber ?? "", // Optional fields
      eMoneyPin: values.eMoneyPin ?? "", // Optional fields
      items: cart,
    });

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (!res.ok) {
      console.error("Failed to submit order");
    } else {
      const data = await res.json();
      console.log(data);
      setIsDisabled(false);
      setIsConfirmationDialogOpen(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="grid w-full gap-7 rounded-lg bg-white p-9 lg:w-[70%]">
            <h1 className="text-4xl">Checkout</h1>
            <div className="space-y-3">
              <span className="text-subtitle uppercase text-beige-dark">
                Billing Details
              </span>
              <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Alexei Ward"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="alexei@mail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => handlePhoneNumberChange(e, field)}
                          value={field.value}
                          placeholder="+1 202-555-0136"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-subtitle uppercase text-beige-dark">
                Shipping Info
              </span>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grid md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="1137 Williams Avenue"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => handleNumericChange(e, field)}
                          value={field.value}
                          placeholder="10001"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="New York" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="United States"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-subtitle uppercase text-beige-dark">
                Payment Details
              </span>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  name="paymentMethod"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="paymentMethod">Payment Method</Label>
                      <div className="grid gap-3">
                        <Radio
                          {...field}
                          label="e-Money"
                          name="paymentMethod"
                          value="e-money"
                          checked={field.value === "e-money"}
                        />
                        <Radio
                          {...field}
                          label="Cash on Delivery"
                          name="paymentMethod"
                          value="cash-on-delivery"
                          checked={field.value === "cash-on-delivery"}
                        />
                      </div>
                    </>
                  )}
                />
              </div>
            </div>
            {paymentMethod === "e-money" && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="eMoneyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>e-Money Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => handleNumericChange(e, field)}
                          value={field.value}
                          placeholder="238521993"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eMoneyPin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>e-Money PIN</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => handleNumericChange(e, field)}
                          value={field.value}
                          placeholder="6891"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <div className="grid h-fit w-full gap-4 rounded-lg bg-white p-6 lg:w-[30%]">
            <h4 className="text-xl uppercase">Summary</h4>
            {cart.map((item) => (
              <div key={item.slug} className="flex items-center gap-3">
                <CldImage
                  src={item.productImage}
                  alt={item.name}
                  width={150}
                  height={150}
                  aspectRatio={1}
                  className="w-16 rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-black">
                    {shortenProductName(item.name)}
                  </span>
                  <span className="text-[14px] font-bold text-black/50">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
                <span className="ml-auto text-base font-bold text-black/50">
                  x{item.quantity}
                </span>
              </div>
            ))}
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-base uppercase text-black/50">Total</span>
                <span className="text-[17px] font-bold">
                  ${getTotalCartValue()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base uppercase text-black/50">
                  Shipping
                </span>
                <span className="text-[17px] font-bold">${shippingCost}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base uppercase text-black/50">
                  VAT (Included)
                </span>
                <span className="text-[17px] font-bold">
                  ${calculateVAT().toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="text-base uppercase text-black/50">
                Grand Total
              </span>
              <span className="text-[17px] font-bold text-beige-dark">
                ${getGrandTotal().toLocaleString()}
              </span>
            </div>
            {/* <Button type="submit" className="h-fit w-full">
              Checkout
            </Button> */}
            <OrderConfirmationAlert
              cart={cart}
              open={isConfirmationDialogOpen}
              setOpen={setIsConfirmationDialogOpen}
              isDisabled={isDisabled}
              grandTotal={getGrandTotal()}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
