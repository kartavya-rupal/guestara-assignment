import { Router } from "express";
import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deactivateItem,
    getItemPrice
} from "./item.controller.js";

const router = Router();

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deactivateItem);

router.get("/:id/price", getItemPrice);

export default router;
