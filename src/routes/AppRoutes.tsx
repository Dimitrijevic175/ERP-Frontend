import {Routes, Route, Navigate, useParams, useLocation} from "react-router-dom"
import Login from "@/pages/LoginPage.tsx"
import WarehousePage from "@/pages/WarehousePage.tsx";
import WarehouseStockPage from "@/pages/WarehouseStockPage.tsx";
import ProductsPage from "@/pages/ProductPage.tsx"
import UsersPage from "@/pages/UsersPage"
import SalesPage from "@/pages/SalesPage"
import SalesDetailPage from "@/pages/SalesDetailPage"
import PurchaseOrdersPage from "@/pages/PurchaseOrdersPage.tsx";
import PurchaseOrderDetailPage from "@/pages/PurchaseOrderDetailPage.tsx";
import LandingPage from "@/pages/LandingPage"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/warehouses" element={<WarehousePage />} />
            <Route path="/warehouse/:id/stock" element={<WarehouseStockPageWrapper />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/sales/:id" element={<SalesDetailPage />} />
            <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="/purchase-orders/:id" element={<PurchaseOrderDetailPage />} />
        </Routes>
    )
}

function WarehouseStockPageWrapper() {
    const { id } = useParams<{ id: string }>()
    const location = useLocation()

    // Ako korisnik dođe sa WarehousePage, ime je u state-u.
    // Ako ukuca direktno URL, stavljamo fallback "Warehouse"
    const name = (location.state)?.warehouseName || "Warehouse"

    if (!id) return <p>Invalid warehouse</p>

    return <WarehouseStockPage warehouseId={parseInt(id)} warehouseName={name} />
}
