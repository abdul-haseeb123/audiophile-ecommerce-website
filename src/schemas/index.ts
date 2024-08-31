import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be 2 or more characters long" })
    .max(100, { message: "Name must be 100 or fewer characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .regex(new RegExp(/^(?:\+)?(?:\d+[-\s]?)*\d+$/))
    .refine(
      (phoneNumber: string): boolean => {
        // Remove all non-numeric characters
        const cleaned = phoneNumber.replace(/\D/g, "");
        // Check if the cleaned number has the correct length
        return cleaned.length >= 10 && cleaned.length <= 14;
      },
      {
        message:
          "Phone number must be between 10 and 14 digits long and contain only numeric characters",
      },
    ),
  address: z
    .string()
    .min(10, { message: "Address must be 10 or more characters long" })
    .max(100, { message: "Address must be 100 or fewer characters long" }),
  zipCode: z
    .string()
    .min(5, { message: "Zip code must be 5 or more characters long" })
    .max(10, { message: "Zip code must be 10 or fewer characters long" }),
  city: z
    .string()
    .min(2, { message: "City must be 2 or more characters long" })
    .max(50, { message: "City must be 50 or fewer characters long" }),
  country: z
    .string()
    .min(2, { message: "Country must be 2 or more characters long" })
    .max(50, { message: "Country must be 50 or fewer characters long" }),
  paymentMethod: z.enum(["e-money", "cash-on-delivery"]),
});

const eMoneySchema = baseSchema.extend({
  eMoneyNumber: z
    .string()
    .min(10, { message: "e-money number must be 10 or more characters long" })
    .max(20, { message: "e-money number must be 20 or fewer characters long" }),
  eMoneyPin: z
    .string()
    .min(4, { message: "e-money PIN must be 4 or more characters long" })
    .max(6, { message: "e-money PIN must be 6 or fewer characters long" }),
});

const cashOnDeliverySchema = baseSchema;

export { cashOnDeliverySchema, eMoneySchema };
