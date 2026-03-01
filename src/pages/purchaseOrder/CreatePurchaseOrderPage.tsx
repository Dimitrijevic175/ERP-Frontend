import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllWarehouses, getSuppliers, createPurchaseOrder } from "@/api/api.ts"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select.tsx"
import { Loader2 } from "lucide-react"

import type { WarehouseDto } from "@/model/Warehouse.ts"
import type { SupplierResponseDto } from "@/model/Procurement.ts"

export default function CreatePurchaseOrderPage() {
    const navigate = useNavigate()

    const [warehouses, setWarehouses] = useState<WarehouseDto[]>([])
    const [suppliers, setSuppliers] = useState<SupplierResponseDto[]>([])

    const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(null)
    const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null)

    const [loading, setLoading] = useState(false)
    const [fadeInSupplier, setFadeInSupplier] = useState(false)

    useEffect(() => {
        fetchWarehouses()
        fetchSuppliers()
    }, [])

    useEffect(() => {
        if (selectedWarehouseId !== null) {
            setTimeout(() => setFadeInSupplier(true), 150)
        } else {
            setFadeInSupplier(false)
            setSelectedSupplierId(null)
        }
    }, [selectedWarehouseId])

    const fetchWarehouses = async () => {
        const res = await getAllWarehouses()
        setWarehouses(res.content)
    }

    const fetchSuppliers = async () => {
        const res = await getSuppliers()
        setSuppliers(res)
    }

    const handleSelectWarehouse = (id: number) => {
        if (selectedWarehouseId === id) {
            setSelectedWarehouseId(null)
        } else {
            setSelectedWarehouseId(id)
        }
    }

    const handleCreate = async () => {
        if (!selectedWarehouseId || !selectedSupplierId) return

        try {
            setLoading(true)

            const response = await createPurchaseOrder({
                warehouseId: selectedWarehouseId,
                supplierId: selectedSupplierId,
            })

            if (response && response.id) {
                navigate(`/purchase-orders/submit/${response.id}`, {
                    state: { order: response }
                })
            } else {
                console.error("No ID returned from createPurchaseOrder")
            }

        } catch (err) {
            console.error("Failed to create purchase order", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10">

            <h1 className="text-3xl font-bold tracking-tight">
                Create Purchase Order
            </h1>

            {/* WAREHOUSE SELECTION */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    1. Select Warehouse
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                    {warehouses.map((warehouse) => {
                        const isSelected = selectedWarehouseId === warehouse.id
                        const isDisabled =
                            selectedWarehouseId !== null &&
                            selectedWarehouseId !== warehouse.id

                        return (
                            <Card
                                key={warehouse.id}
                                onClick={() =>
                                    !isDisabled && handleSelectWarehouse(warehouse.id)
                                }
                                className={`
                                    transition-all duration-300 cursor-pointer
                                    ${isSelected ? "ring-2 ring-primary scale-105 shadow-xl" : ""}
                                    ${isDisabled ? "opacity-40 pointer-events-none cursor-not-allowed" : "hover:shadow-lg hover:scale-105"}
                                `}
                            >
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg">
                                        {warehouse.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {warehouse.location}
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* SUPPLIER SELECTION */}
            <div
                className={`space-y-4 transition-all duration-500 ${
                    fadeInSupplier
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <h2 className="text-lg font-semibold">
                    2. Select Supplier
                </h2>

                <div className="max-w-md">
                    <Select
                        value={selectedSupplierId?.toString()}
                        onValueChange={(value) =>
                            setSelectedSupplierId(Number(value))
                        }
                        disabled={!selectedWarehouseId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Choose supplier" />
                        </SelectTrigger>
                        <SelectContent>
                            {suppliers
                                .filter((s) => s.active)
                                .map((supplier) => (
                                    <SelectItem
                                        key={supplier.id}
                                        value={supplier.id.toString()}
                                    >
                                        {supplier.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* CREATE BUTTON */}
            <div className="pt-6">
                <Button
                    onClick={handleCreate}
                    disabled={
                        !selectedWarehouseId ||
                        !selectedSupplierId ||
                        loading
                    }
                    className="gap-2 font-semibold cursor-pointer"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Create Purchase Order
                </Button>
            </div>
        </div>
    )
}