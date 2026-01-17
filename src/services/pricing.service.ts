import dayjs from "dayjs";

export type PricingContext = {
    usage?: number;
    time?: Date;
};

export const calculateBasePrice = (
    pricingConfig: any,
    context: PricingContext
): number => {
    switch (pricingConfig.type) {

        case "STATIC":
            return pricingConfig.price;

        case "COMPLIMENTARY":
            return 0;

        case "DISCOUNTED": {
            const base = pricingConfig.base_price;
            const discount = pricingConfig.discount;

            let discountValue = 0;

            if (discount.type === "FLAT") {
                discountValue = discount.value;
            } else if (discount.type === "PERCENT") {
                discountValue = (base * discount.value) / 100;
            }

            return Math.max(base - discountValue, 0);
        }

        case "TIERED": {
            if (context.usage === undefined) {
                throw new Error("Usage is required for tiered pricing");
            }

            const usage = context.usage;
            const tier = pricingConfig.tiers.find(
                (t: any) => usage <= t.upto
            );

            if (!tier) {
                throw new Error("No applicable tier found");
            }

            return tier.price;
        }

        case "DYNAMIC": {
            if (!context.time) {
                throw new Error("Time is required for dynamic pricing");
            }

            const now = dayjs(context.time);

            const window = pricingConfig.windows.find((w: any) => {
                return now.isAfter(dayjs(w.start)) && now.isBefore(dayjs(w.end));
            });

            if (!window) {
                throw new Error("Item not available at this time");
            }

            return window.price;
        }

        default:
            throw new Error("Invalid pricing type");
    }
};
