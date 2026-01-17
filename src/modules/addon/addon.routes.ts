import { Router } from "express";
import {
    createAddon,
    getAddonsByItem,
    updateAddon,
    deactivateAddon
} from "./addon.controller.js";

const router = Router();

router.post("/", createAddon);
router.get("/item/:itemId", getAddonsByItem);
router.put("/:id", updateAddon);
router.delete("/:id", deactivateAddon);

export default router;
