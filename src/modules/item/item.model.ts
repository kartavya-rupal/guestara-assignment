import { Schema, model, Document, Types } from "mongoose";
import { PricingConfig } from "../../types/pricing.types.js";

export interface AvailabilityConfig {
    days: string[];       
    slots: string[];      
}

export interface ItemDocument extends Document {
    name: string;
    description?: string;
    image?: string;

    category?: Types.ObjectId;
    subcategory?: Types.ObjectId;

    pricing: PricingConfig;
    availability?: AvailabilityConfig;

    is_active: boolean;
}

const availabilitySchema = new Schema<AvailabilityConfig>(
    {
        days: {
            type: [String]
        },
        slots: {
            type: [String]
        }
    },
    { _id: false }
);

const itemSchema = new Schema<ItemDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: "Subcategory"
        },

        pricing: {
            type: Object,
            required: true
        },

        availability: {
            type: availabilitySchema
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

itemSchema.pre<ItemDocument>("save", function (next: any) {
    if (
        (this.category && this.subcategory) ||
        (!this.category && !this.subcategory)
    ) {
        return next(
            new Error(
                "Item must belong to either category or subcategory (not both)"
            )
        );
    } else {
        return next();
    }
});

export const Item = model<ItemDocument>("Item", itemSchema);
