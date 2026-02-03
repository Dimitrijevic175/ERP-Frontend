import type {ProductResponse} from "@/model/Product.ts";

export interface WarehouseDto {
    id: number
    name: string
    location: string
}

export interface WarehouseStockDto {
    id: number;
    productId: number;
    quantity: number;
}

export interface WarehouseStockWithProduct extends WarehouseStockDto {
    product: ProductResponse
}