import express from "express";
import categoryRoutes from "./modules/category/category.routes.js";
import subcategoryRoutes from "./modules/subcategory/subcategory.routes.js";
import itemRoutes from "./modules/item/item.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";
import addonRoutes from "./modules/addon/addon.routes.js";

export const app = express();

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/items", itemRoutes);
app.use("/bookings", bookingRoutes);
app.use("/addons", addonRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).json({
        message: err.message || "Internal Server Error"
    });
});
