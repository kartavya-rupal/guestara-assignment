import { Request, Response } from "express";
import { Types } from "mongoose";
import { Item } from "./item.model.js";
import { Category } from "../category/category.model.js";
import { Subcategory } from "../subcategory/subcategory.model.js";
import { Addon } from "../addon/addon.model.js";

import { calculateBasePrice } from "../../services/pricing.service.js";
import { resolveTax } from "../../services/tax.service.js";

export const createItem = async (req: Request, res: Response) => {
    const item = await Item.create(req.body);
    res.status(201).json(item);
};

export const getItems = async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search,
        minPrice,
        maxPrice
    } = req.query;

    const filter: any = { is_active: true };

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    const items = await Item.find(filter)
        .populate("category subcategory")
        .skip((+page - 1) * +limit)
        .limit(+limit);

    res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
    const item = await Item.findById(req.params.id)
        .populate("category subcategory");

    if (!item || !item.is_active) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
};

export const updateItem = async (req: Request, res: Response) => {
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
};

export const deactivateItem = async (req: Request, res: Response) => {
    await Item.findByIdAndUpdate(req.params.id, { is_active: false });
    res.json({ message: "Item deactivated" });
};


export const getItemPrice = async (req: Request, res: Response) => {
    const item = await Item.findById(req.params.id)
        .populate("category subcategory");

    if (!item || !item.is_active) {
        return res.status(404).json({ message: "Item not found" });
    }

    const addons = req.query.addons
        ? await Addon.find({ _id: { $in: Array.isArray(req.query.addons) ? req.query.addons.map(id => new Types.ObjectId(id as string)) : [new Types.ObjectId(req.query.addons as string)] } })
        : [];

    const basePrice = calculateBasePrice(
        item.pricing,
        {
            usage: req.query.usage ? Number(req.query.usage) : undefined,
            time: new Date()
        }
    );

    const addonTotal = addons.reduce(
        (sum, a) => sum + a.price,
        0
    );

    const tax = resolveTax(
        null,
        item.subcategory as any,
        item.category as any
    );

    const taxAmount = tax.applicable
        ? ((basePrice + addonTotal) * tax.percentage) / 100
        : 0;

    res.json({
        pricingType: item.pricing.type,
        basePrice,
        addonsTotal: addonTotal,
        tax: taxAmount,
        finalPrice: basePrice + addonTotal + taxAmount
    });
};
