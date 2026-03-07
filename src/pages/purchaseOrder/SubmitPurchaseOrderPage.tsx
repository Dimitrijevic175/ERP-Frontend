import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { getPurchaseOrder, getProducts, submitPurchaseOrder } from "@/api/api.ts"
import type { PurchaseOrderItemDto, PurchaseOrderResponse } from "@/model/Procurement.ts"
import type { ProductResponse, PageResponse } from "@/model/Product.ts"
import { PurchaseOrderHeader } from "@/components/purchaseOrder/PurchaseOrderHeader"
import { PurchaseOrderItems } from "@/components/purchaseOrder/PurchaseOrderItems.tsx"
import { ProductSelectModal } from "@/components/purchaseOrder/ProductSelectModal"
import { Spinner } from "@/components/ui/spinner.tsx"


export default function SubmitPurchaseOrderPage() {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [order, setOrder] = useState<PurchaseOrderResponse | null>(location.state?.order || null)
    const [loading, setLoading] = useState(!location.state?.order)
    const [fade, setFade] = useState(false)
    const [submitting, setSubmitting] = useState(false)


    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<ProductResponse[]>([])
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    useEffect(() => {
        if (!order && id) {
            fetchOrder(Number(id))
        }
        const timer = setTimeout(() => setFade(true), 50)
        return () => clearTimeout(timer)
    }, [id])

    const fetchOrder = async (orderId: number) => {
        try {
            setLoading(true)
            const data = await getPurchaseOrder(orderId)
            setOrder({ ...data, warehouseId: data.id ?? 0 })
        } catch (err) {
            console.error("Failed to fetch purchase order", err)
        } finally {
            setLoading(false)
        }
    }

    const calculateTotal = () => {
        if (!order) return 0
        return order.items.reduce((sum, item) => sum + item.purchasePrice * item.quantity, 0)
    }

    const fetchProducts = async (pageNumber: number) => {
        try {
            const data: PageResponse<ProductResponse> = await getProducts({ page: pageNumber, size: 10 })
            setProducts(data.content)
        } catch (err) {
            console.error("Failed to fetch products", err)
        }
    }

    const handleSubmit = async () => {
        if (!order) return

        try {
            setSubmitting(true)
            await submitPurchaseOrder(order.id, {
                items: order.items.map(i => ({
                    productId: i.productId,
                    quantity: i.quantity,
                    purchasePrice: i.purchasePrice,
                    productName: i.productName || "Unnamed product"
                }))
            })

            navigate("/purchase-orders")
        } catch (err) {
            console.error("Failed to submit purchase order", err)
            alert("Failed to submit purchase order. Check console for details.")
        }
        finally {
            setSubmitting(false)
        }
    }

    const handleAddProduct = () => {
        if (!selectedProduct || !order) return
        const newItem: PurchaseOrderItemDto = {
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity,
            purchasePrice: selectedProduct.purchasePrice || 0
        }
        setOrder({ ...order, items: [...order.items, newItem] })
        setSelectedProduct(null)
        setQuantity(1)
        setOpen(false)
    }

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-10 text-center">
                <p className="text-muted-foreground">Loading purchase order...</p>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="max-w-5xl mx-auto py-10 text-center">
                <p className="text-red-500">Purchase order not found.</p>
                <Button onClick={() => navigate("/purchase-orders")} className="mt-4">Back</Button>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-6">
            {submitting ? (
                <div className="flex justify-center items-center mt-50 bg-background p-6 rounded-md">
                    <Spinner className="h-12 w-12 animate-spin text-primary-background" />
                </div>
            ) : (
                <>
                    <PurchaseOrderHeader order={order} fade={fade} />

                    <PurchaseOrderItems
                        items={order.items}
                        calculateTotal={calculateTotal}
                        onAddClick={() => {
                            fetchProducts(0)
                            setOpen(true)
                        }}
                    />

                    <ProductSelectModal
                        open={open}
                        onOpenChange={setOpen}
                        products={products}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        onAdd={handleAddProduct}
                    />

                    <div className="max-w-5xl mx-auto flex justify-end gap-4 px-4">
                        <Button
                            className="cursor-pointer"
                            disabled={order.items.length === 0}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}