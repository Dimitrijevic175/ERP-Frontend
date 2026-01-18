import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

function App() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
            <div className="p-10 border rounded-xl bg-card shadow-sm flex flex-col items-center gap-6">
                <h1 className="text-3xl font-bold italic tracking-tight uppercase">
                    ERP System
                </h1>

                <div className="flex gap-4">
                    <Button variant="default">Main Button</Button>
                    <Button variant="outline">Logs</Button>
                    <Button variant="destructive">Delete Account</Button>
                </div>

                <hr className="w-full border-muted" />

                <Button
                    variant="secondary"
                    onClick={toggleTheme}
                >
                    {isDark ? "Light Theme" : "Dark Theme"}
                </Button>
            </div>
        </div>
    )
}

export default App