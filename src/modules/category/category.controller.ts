import { Request, Response } from "express";
import { Category } from "./category.model.js";

export const createCategory = async (req: Request, res: Response) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
};

export const getCategories = async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
        activeOnly = "true"
    } = req.query;

    const filter: any = {};
    if (activeOnly === "true") {
        filter.is_active = true;
    }

    const categories = await Category.find(filter)
        .sort({ [sortBy as string]: order === "asc" ? 1 : -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit);

    res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if (!category || !category.is_active) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
};

export const deactivateCategory = async (req: Request, res: Response) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { is_active: false },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deactivated successfully" });
};
