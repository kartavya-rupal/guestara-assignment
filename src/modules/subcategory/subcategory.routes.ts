import { Router } from "express";
import {
    createSubcategory,
    getSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deactivateSubcategory
} from "./subcategory.controller.js";

const router = Router();

router.post("/", createSubcategory);
router.get("/", getSubcategories);
router.get("/:id", getSubcategoryById);
router.put("/:id", updateSubcategory);
router.delete("/:id", deactivateSubcategory);

export default router;
