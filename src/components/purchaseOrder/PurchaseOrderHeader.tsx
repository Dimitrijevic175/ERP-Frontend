import type { PurchaseOrderResponse } from "@/model/Procurement"

interface Props {
    order: PurchaseOrderResponse
    fade: boolean
}

export function PurchaseOrderHeader({ order, fade }: Props) {
    return (
        <>
            <div
                className={`transition-opacity duration-700 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                <h1 className="text-2xl font-bold">
                    Purchase Order #{order.id}
                </h1>

                <p className="text-sm text-muted-foreground">
                    Created at:{" "}
                    {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                </p>
            </div>

            {/* INFO CARDS */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-xl">
                    <h2 className="font-semibold text-lg">Warehouse</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        ID: {order.warehouseId ?? "N/A"}
                    </p>
                    <p className="text-sm mt-1">
                        {order.warehouseName ?? ""}
                    </p>
                </div>

                <div className="p-6 border rounded-xl">
                    <h2 className="font-semibold text-lg">Supplier</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        ID: {order.supplierId ?? "N/A"}
                    </p>
                    <p className="text-sm mt-1">
                        {order.supplierName ?? ""}
                    </p>
                </div>

                <div className="p-6 border rounded-xl">
                    <h2 className="font-semibold text-lg">Status</h2>
                    <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-muted">
                        {order.status ?? "N/A"}
                    </span>
                </div>
            </div>
        </>
    )
}