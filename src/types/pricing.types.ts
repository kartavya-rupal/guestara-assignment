export enum PricingType {
    STATIC = "STATIC",
    TIERED = "TIERED",
    COMPLIMENTARY = "COMPLIMENTARY",
    DISCOUNTED = "DISCOUNTED",
    DYNAMIC = "DYNAMIC"
}

export enum DiscountType {
    FLAT = "FLAT",
    PERCENT = "PERCENT"
}

export type StaticPricing = {
    type: PricingType.STATIC;
    price: number;
};

export type PricingTier = {
    upto: number;
    price: number;
};

export type TieredPricing = {
    type: PricingType.TIERED;
    tiers: PricingTier[];
};

export type ComplimentaryPricing = {
    type: PricingType.COMPLIMENTARY;
};

export type Discount = {
    type: DiscountType.FLAT | DiscountType.PERCENT;
    value: number;
};

export type DiscountedPricing = {
    type: PricingType.DISCOUNTED;
    base_price: number;
    discount: Discount;
};

export type PricingWindow = {
    start: string;
    end: string;
    price: number;
};

export type DynamicPricing = {
    type: PricingType.DYNAMIC;
    windows: PricingWindow[];
};

export type PricingConfig =
    | StaticPricing
    | TieredPricing
    | ComplimentaryPricing
    | DiscountedPricing
    | DynamicPricing;

export type PricingContext = {
    usage?: number;
    time?: Date;
};
