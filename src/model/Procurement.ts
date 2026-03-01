export interface SupplierResponseDto {
    id:number,
    name:string,
    address:string,
    taxNumber:number,
    registrationNumber:number,
    active:boolean
}

export interface PurchaseOrderItemDto {
    productId: number
    quantity: number
    purchasePrice: number
    productName:string
}

export interface SubmitPurchaseOrderRequest {
    items: PurchaseOrderItemDto[]
}

export interface PurchaseOrderSubmitResponse {
    purchaseOrderId: number;
    supplierEmail: string;
    pdfBytes: string;
}

export interface PurchaseOrderResponse {
    id: number
    status: string | null
    createdAt: string | null
    warehouseId: number | null
    supplierId: number | null
    supplierName?: string
    warehouseName?: string | null
    items: PurchaseOrderItemDto[]
}