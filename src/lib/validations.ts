import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  companyName: z.string().optional(),
});

export const AddressSchema = z.object({
  type: z.enum(["SHIPPING", "BILLING"]).default("SHIPPING"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().default("India"),
});

export const ProfileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional().nullable(),
  lastName: z.string().min(1, "Last name is required").optional().nullable(),
  phone: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
});
