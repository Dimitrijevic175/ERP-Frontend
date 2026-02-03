export interface ProductResponse {
    id: number;
    name: string;
    sku: string;
    description?: string;
    categoryId?: number;
    brand?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    taxRate?: number;
    minQuantity?: number;
    maxQuantity?: number;
    unitOfMeasure?: string;
    active?: boolean;
}