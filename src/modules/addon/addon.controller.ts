import { Request, Response } from "express";
import { Addon } from "./addon.model.js";
import { Item } from "../item/item.model.js";

export const createAddon = async (req: Request, res: Response) => {
    const itemExists = await Item.findById(req.body.item);

    if (!itemExists || !itemExists.is_active) {
        return res.status(400).json({
            message: "Invalid or inactive item"
        });
    }

    const addon = await Addon.create(req.body);
    res.status(201).json(addon);
};

export const getAddonsByItem = async (req: Request, res: Response) => {
    const { itemId } = req.params;

    const addons = await Addon.find({
        item: itemId,
        is_active: true
    });

    res.json(addons);
};

export const updateAddon = async (req: Request, res: Response) => {
    const addon = await Addon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!addon) {
        return res.status(404).json({ message: "Addon not found" });
    }

    res.json(addon);
};

export const deactivateAddon = async (req: Request, res: Response) => {
    const addon = await Addon.findByIdAndUpdate(
        req.params.id,
        { is_active: false },
        { new: true }
    );

    if (!addon) {
        return res.status(404).json({ message: "Addon not found" });
    }

    res.json({ message: "Addon deactivated successfully" });
};
