import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    image?: string;
    description?: string;
    tax_applicable: boolean;
    tax_percentage?: number;
    is_active: boolean;
}

const categorySchema = new Schema<CategoryDocument>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        tax_applicable: {
            type: Boolean,
            default: false
        },
        tax_percentage: {
            type: Number,
            min: 0,
            max: 100
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const Category = model<CategoryDocument>(
    "Category",
    categorySchema
);
