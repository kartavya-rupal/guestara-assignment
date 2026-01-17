import { Router } from "express";
import {
    getItemAvailability,
    createBooking
} from "./booking.controller.js";

const router = Router();

router.get("/items/:itemId/availability", getItemAvailability);

router.post("/", createBooking);

export default router;
