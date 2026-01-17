import { Request, Response } from "express";
import { getAvailableSlots, bookSlot } from "../../services/booking.service.js";
import { Item } from "../item/item.model.js";

export const getItemAvailability = async (req: Request, res: Response) => {
    const { itemId } = req.params as { itemId: string };
    const { date } = req.query as { date: string };

    const item = await Item.findById(itemId);

    if (!item || !item.is_active) {
        return res.status(404).json({ message: "Item not found or inactive" });
    }

    if (!item.availability) {
        return res.status(400).json({ message: "Item is not bookable" });
    }

    const availableSlots = await getAvailableSlots(
        itemId,
        date,
        item.availability.slots
    );

    res.json({
        itemId,
        date,
        availableSlots
    });
};

export const createBooking = async (req: Request, res: Response) => {
    const { itemId, date, slot } = req.body;

    const booking = await bookSlot({
        itemId,
        date,
        slot
    });

    res.status(201).json(booking);
};
