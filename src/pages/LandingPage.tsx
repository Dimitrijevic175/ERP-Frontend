import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
    const [fade, setFade] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setFade(true), 50)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12 space-y-16">
            {/* Hero / Introduction */}
            <section
                className={`text-center space-y-4 transition-opacity duration-1000 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                <h1 className="text-4xl md:text-5xl font-bold">
                    Welcome to ERP System
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A comprehensive solution for managing sales, procurement, inventory, and finance – all in one place, simple and efficient.
                </p>
            </section>

            {/* Key Features */}
            <section
                className={`grid md:grid-cols-3 gap-6 transition-opacity duration-1000 delay-400 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                <Card className="hover:shadow-lg dark:hover:shadow-white/20 transition">
                    <CardHeader>
                        <CardTitle>Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>
                            Manage all sales orders, track statuses, and generate reports.
                        </p>
                        <Badge variant="secondary" className="mr-2">Fast</Badge>
                        <Badge variant="secondary">Transparent</Badge>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg dark:hover:shadow-white/20 transition">
                    <CardHeader>
                        <CardTitle>Procurement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>
                            Create and monitor purchase orders, manage suppliers, and track items.
                        </p>
                        <Badge variant="secondary" className="mr-2">Efficient</Badge>
                        <Badge variant="secondary">Reliable</Badge>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg dark:hover:shadow-white/20 transition">
                    <CardHeader>
                        <CardTitle>Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>
                            View warehouse stock levels and receive alerts for low inventory.
                        </p>
                        <Badge variant="secondary" className="mr-2">Accurate</Badge>
                        <Badge variant="secondary">Control</Badge>
                    </CardContent>
                </Card>
            </section>

            {/* Call to Action */}
            <section
                className={`text-center space-y-2 transition-opacity duration-1000 delay-800 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                <h2 className="text-2xl font-semibold">
                    Ready to take your business to the next level?
                </h2>
                <Button
                    size="lg"
                    variant="default"
                    onClick={() =>
                        (window.location.href =
                            "mailto:maksimdimitrijevic@gmail.com?subject=Contact%20ERP&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20ERP%20System.")
                    }
                    className="
        bg-gradient-to-br from-purple-600 to-pink-500
        hover:from-purple-700 hover:to-pink-600
        transition-all duration-300 ease-in-out
        hover:scale-105
        hover:shadow-lg hover:shadow-pink-500/40
        cursor-pointer
        text-foreground
    "

                >
                    Contact us
                </Button>
            </section>
        </div>
    )
}
