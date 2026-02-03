import AppRoutes from "@/routes/AppRoutes"
import Navbar from "@/components/Navbar.tsx";


function App() {

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <Navbar />
            {/* Main content */}
            <div className="h-full w-full">
                <AppRoutes />
            </div>
        </div>
    )
}

export default App