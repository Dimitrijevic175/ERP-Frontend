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

export interface PageResponse<T> {
    content: T[]
    totalPages: number
    totalElements: number
    size: number
    number: number
}
