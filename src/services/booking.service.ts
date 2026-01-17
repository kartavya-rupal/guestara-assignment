import { Booking } from "../modules/booking/booking.model";

type SlotInput = {
    itemId: string;
    date: string;   
    slot: string;   
};

export const getAvailableSlots = async (
    itemId: string,
    date: string,
    allSlots: string[]
) => {
    const bookings = await Booking.find({ item: itemId, date });

    const bookedSlots = bookings.map(b => b.slot);

    return allSlots.filter(slot => !bookedSlots.includes(slot));
};

export const bookSlot = async ({ itemId, date, slot }: SlotInput) => {
    const existing = await Booking.findOne({
        item: itemId,
        date,
        slot
    });

    if (existing) {
        throw new Error("Slot already booked");
    }

    const booking = await Booking.create({
        item: itemId,
        date,
        slot
    });

    return booking;
};
