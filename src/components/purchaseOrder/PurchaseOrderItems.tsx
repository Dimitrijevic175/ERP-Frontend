import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { PurchaseOrderItemDto } from "@/model/Procurement"

interface Props {
    items: PurchaseOrderItemDto[]
    onAddClick: () => void
    calculateTotal: () => number
}

export function PurchaseOrderItems({
                                       items,
                                       onAddClick,
                                       calculateTotal
                                   }: Props) {
    return (
        <div className="border rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Items</h2>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddClick}
                >
                    <Plus className="w-4 h-4 mr-1" /> Add Product
                </Button>
            </div>

            {items.length === 0 ? (
                <p className="text-muted-foreground">
                    No items added yet.
                </p>
            ) : (
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between border-b pb-2"
                        >
                            <div>
                                <p className="font-medium">
                                    {item.productName ?? "Unnamed product"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {item.quantity} × {item.purchasePrice}
                                </p>
                            </div>

                            <div className="font-semibold">
                                {(item.quantity * item.purchasePrice).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end pt-4 border-t">
                <p className="text-lg font-bold">
                    Total: {calculateTotal().toFixed(2)}
                </p>
            </div>
        </div>
    )
}