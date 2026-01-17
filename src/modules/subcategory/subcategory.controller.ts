import { Request, Response } from "express";
import { Subcategory } from "./subcategory.model.js";
import { Category } from "../category/category.model.js";

export const createSubcategory = async (req: Request, res: Response) => {
    const categoryExists = await Category.findById(req.body.category);

    if (!categoryExists || !categoryExists.is_active) {
        return res.status(400).json({
            message: "Invalid or inactive category"
        });
    }

    const subcategory = await Subcategory.create(req.body);
    res.status(201).json(subcategory);
};

export const getSubcategories = async (req: Request, res: Response) => {
    const { category, activeOnly = "true" } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (activeOnly === "true") filter.is_active = true;

    const subcategories = await Subcategory.find(filter)
        .populate("category", "name is_active");

    const visible = subcategories.filter(
        (s: any) => s.category?.is_active !== false
    );

    res.json(visible);
};

export const getSubcategoryById = async (req: Request, res: Response) => {
    const subcategory = await Subcategory.findById(req.params.id)
        .populate("category", "is_active");

    if (!subcategory || !subcategory.is_active) {
        return res.status(404).json({ message: "Subcategory not found" });
    }

    if ((subcategory.category as any)?.is_active === false) {
        return res.status(404).json({ message: "Subcategory not active" });
    }

    res.json(subcategory);
};

export const updateSubcategory = async (req: Request, res: Response) => {
    const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(subcategory);
};

export const deactivateSubcategory = async (req: Request, res: Response) => {
    const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        { is_active: false },
        { new: true }
    );

    if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({ message: "Subcategory deactivated successfully" });
};
