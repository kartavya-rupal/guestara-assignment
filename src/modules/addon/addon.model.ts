import { Schema, model, Document, Types } from "mongoose";

export interface AddonDocument extends Document {
    item: Types.ObjectId;
    name: string;
    price: number;
    is_required: boolean;
    group?: string;
    is_active: boolean;
}

const addonSchema = new Schema<AddonDocument>(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        is_required: {
            type: Boolean,
            default: false
        },
        group: {
            type: String
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

addonSchema.index({ item: 1, name: 1 }, { unique: true });

export const Addon = model<AddonDocument>(
    "Addon",
    addonSchema
);
