import {Dialog,DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import type { ProductResponse } from "@/model/Product"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    products: ProductResponse[]
    selectedProduct: ProductResponse | null
    setSelectedProduct: (p: ProductResponse | null) => void
    quantity: number
    setQuantity: (q: number) => void
    onAdd: () => void
}

export function ProductSelectModal({
                                       open,
                                       onOpenChange,
                                       products,
                                       selectedProduct,
                                       setSelectedProduct,
                                       quantity,
                                       setQuantity,
                                       onAdd
                                   }: Props) {

    const handleQuantityChange = (val: string) => {
        if (!selectedProduct) return

        if (val === "") {
            setQuantity(0)
            return
        }

        const num = Number(val)

        if (selectedProduct.maxQuantity && num > selectedProduct.maxQuantity) {
            alert(`Cannot exceed max quantity of ${selectedProduct.maxQuantity}`)
            setQuantity(selectedProduct.maxQuantity)
        } else if (num < 0) {
            setQuantity(0)
        } else {
            setQuantity(num)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Select Product</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <Select
                        value={selectedProduct?.id.toString() || ""}
                        onValueChange={(val) =>
                            setSelectedProduct(
                                products.find(p => p.id === Number(val)) || null
                            )
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                        </SelectTrigger>

                        <SelectContent className="max-h-60 overflow-y-auto">
                            {products.map(p => (
                                <SelectItem key={p.id} value={p.id.toString()}>
                                    {p.name} (Max: {p.maxQuantity ?? "∞"})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedProduct && (
                        <div className="flex flex-col">
                            <Input
                                type="number"
                                min={1}
                                value={quantity === 0 ? "" : quantity}
                                onChange={(e) =>
                                    handleQuantityChange(e.target.value)
                                }
                                placeholder="Quantity"
                            />

                            {selectedProduct.maxQuantity &&
                                quantity > selectedProduct.maxQuantity && (
                                    <p className="text-sm text-red-500 mt-1">
                                        Quantity cannot exceed {selectedProduct.maxQuantity}
                                    </p>
                                )}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        disabled={!selectedProduct}
                        onClick={onAdd}
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}