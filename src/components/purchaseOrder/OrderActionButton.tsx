import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import type { PurchaseOrder } from "@/model/PurchaseOrder.ts"
import {receivePurchaseOrder} from "@/api/api.ts";

interface Props {
    order: PurchaseOrder
    setOrder: React.Dispatch<React.SetStateAction<PurchaseOrder | null>>
}

export default function OrderActionButton({ order, setOrder }: Props) {
    const navigate = useNavigate()

    // Submit (DRAFT -> SUBMITTED)
    const handleSubmit = () => {
        navigate(`/purchase-orders/submit/${order.id}`)
    }

    // Receive (CONFIRMED -> RECEIVED)
    const handleReceive = async () => {
        if (!order) return
        try {
            const message = await receivePurchaseOrder(order.id)
            alert(message) // opcionalno: prikaz poruke sa backend-a
            setOrder({ ...order, status: "RECEIVED" })
        } catch (err) {
            console.error(err)
            alert("Failed to receive purchase order")
        }
    }

    if (order.status === "DRAFT") {
        return (
            <Button
                onClick={handleSubmit}
                className="mt-15 cursor-pointer"
            >
                Submit Order
            </Button>
        )
    }

    if (order.status === "CONFIRMED") {
        return (
            <Button
                onClick={handleReceive}
                className="mt-15 cursor-pointer"
            >
                Receive Order
            </Button>
        )
    }

    // za ostale statuse ne prikazujemo dugme
    return null
}