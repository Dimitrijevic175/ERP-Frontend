import { Routes, Route, Navigate, useParams } from "react-router-dom"
import Login from "@/pages/LoginPage.tsx"
import WarehousePage from "@/pages/WarehousePage.tsx";
import WarehouseStockPage from "@/pages/WarehouseStockPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/warehouses" element={<WarehousePage />} />
            <Route path="/warehouse/:id/stock" element={<WarehouseStockPageWrapper />} />
        </Routes>
    )
}

function WarehouseStockPageWrapper() {
    const { id } = useParams<{ id: string }>()
    if (!id) return <p>Invalid warehouse</p>
    return <WarehouseStockPage warehouseId={parseInt(id)} />
}
