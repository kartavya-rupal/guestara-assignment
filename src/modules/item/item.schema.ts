import { z } from "zod";
import { PricingType, DiscountType } from "../../types/pricing.types.js";

export const createItemSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        image: z.string().url().optional(),

        category: z.string().optional(),
        subcategory: z.string().optional(),

        pricing: z.object({
            type: z.nativeEnum(PricingType)
        }).passthrough(),

        availability: z.object({
            days: z.array(z.string()),
            slots: z.array(z.string())
        }).optional()
    }).refine(
        (data) =>
            (data.category && !data.subcategory) ||
            (!data.category && data.subcategory),
        {
            message: "Item must belong to either category or subcategory",
            path: ["category"]
        }
    )
});

export const updateItemSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        image: z.string().url().optional(),
        pricing: z.any().optional(),
        availability: z.any().optional(),
        is_active: z.boolean().optional()
    })
});
