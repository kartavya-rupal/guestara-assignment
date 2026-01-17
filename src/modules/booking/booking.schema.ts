import { z } from "zod";

export const getAvailabilitySchema = z.object({
    query: z.object({
        date: z.string().min(1, "Date is required")
    })
});

export const createBookingSchema = z.object({
    body: z.object({
        itemId: z.string().min(1, "Item ID is required"),
        date: z.string().min(1, "Date is required"),
        slot: z.string().min(1, "Slot is required")
    })
});
