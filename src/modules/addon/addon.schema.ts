import { z } from "zod";

export const createAddonSchema = z.object({
    body: z.object({
        item: z.string().min(1, "Item ID is required"),
        name: z.string().min(1, "Addon name is required"),
        price: z.number().min(0),
        is_required: z.boolean().optional(),
        group: z.string().optional()
    })
});

export const updateAddonSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        price: z.number().min(0).optional(),
        is_required: z.boolean().optional(),
        group: z.string().optional(),
        is_active: z.boolean().optional()
    })
});
