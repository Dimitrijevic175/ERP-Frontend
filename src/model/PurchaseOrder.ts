export interface PurchaseOrderItem {
    productId: number
    productName: string
    purchasePrice: number
    quantity: number
}

export interface PurchaseOrder {
    id: number
    createdAt: string
    status: string
    supplierId: number
    items: PurchaseOrderItem[]
}