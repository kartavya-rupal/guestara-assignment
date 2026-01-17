import { Schema, model, Document, Types } from "mongoose";

export interface BookingDocument extends Document {
    item: Types.ObjectId;
    date: string;      
    slot: string;      
    createdAt: Date;
}

const bookingSchema = new Schema<BookingDocument>(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true,
            index: true
        },
        date: {
            type: String,
            required: true
        },
        slot: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

bookingSchema.index(
    { item: 1, date: 1, slot: 1 },
    { unique: true }
);

export const Booking = model<BookingDocument>(
    "Booking",
    bookingSchema
);
