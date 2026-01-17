type TaxSource = {
    tax_applicable?: boolean;
    tax_percentage?: number;
} | null;

export const resolveTax = (
    itemTax: TaxSource,
    subcategoryTax: TaxSource,
    categoryTax: TaxSource
) => {
    if (itemTax?.tax_applicable) {
        return {
            applicable: true,
            percentage: itemTax.tax_percentage ?? 0
        };
    }

    if (subcategoryTax?.tax_applicable) {
        return {
            applicable: true,
            percentage: subcategoryTax.tax_percentage ?? 0
        };
    }

    if (categoryTax?.tax_applicable) {
        return {
            applicable: true,
            percentage: categoryTax.tax_percentage ?? 0
        };
    }

    return {
        applicable: false,
        percentage: 0
    };
};
