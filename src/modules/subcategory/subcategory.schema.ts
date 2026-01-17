import { z } from "zod";

export const createSubcategorySchema = z.object({
    body: z.object({
        category: z.string().min(1, "Category is required"),
        name: z.string().min(1, "Name is required"),
        image: z.string().url().optional(),
        description: z.string().optional(),
        tax_applicable: z.boolean().optional(),
        tax_percentage: z.number().min(0).max(100).optional()
    }).refine(
        (data) =>
            data.tax_applicable !== true || data.tax_percentage !== undefined,
        {
            message: "tax_percentage is required when tax_applicable is true",
            path: ["tax_percentage"]
        }
    )
});

export const updateSubcategorySchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        image: z.string().url().optional(),
        description: z.string().optional(),
        tax_applicable: z.boolean().optional(),
        tax_percentage: z.number().min(0).max(100).optional(),
        is_active: z.boolean().optional()
    })
});
