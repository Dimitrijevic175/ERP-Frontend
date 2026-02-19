import AppRoutes from "@/routes/AppRoutes"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar.tsx"
import Header from "@/components/Header.tsx"
import { useLocation } from "react-router-dom"

function App() {
    const location = useLocation()
    const isLoginPage = location.pathname === "/login"

    return (
        <SidebarProvider defaultOpen>
            <div className="flex min-h-screen w-full bg-background font-sans">
                {/* Sidebar - sakriven na login stranici */}
                {!isLoginPage && <AppSidebar />}

                {/* DESNA STRANA (Main + Header)*/}
                <div className="flex flex-1 flex-col min-w-0">
                    {/* Header - uvek vidljiv */}
                    <Header />

                    {/* Glavni prostor za rute */}
                    <main className="flex-1 bg-muted/10 p-8">
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default App