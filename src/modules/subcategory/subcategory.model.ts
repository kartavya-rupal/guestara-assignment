import { Schema, model, Document, Types } from "mongoose";

export interface SubcategoryDocument extends Document {
    category: Types.ObjectId;
    name: string;
    image?: string;
    description?: string;
    tax_applicable?: boolean;
    tax_percentage?: number;
    is_active: boolean;
}

const subcategorySchema = new Schema<SubcategoryDocument>(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        tax_applicable: {
            type: Boolean
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

subcategorySchema.index({ category: 1, name: 1 }, { unique: true });

export const Subcategory = model<SubcategoryDocument>(
    "Subcategory",
    subcategorySchema
);
