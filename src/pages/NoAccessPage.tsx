import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NoAccessPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
            <Box className="w-16 h-16 text-destructive mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold mb-2">Oops!</h1>
            <p className="text-lg text-muted-foreground mb-6">
                How did you get here? You don't have access to this page.
            </p>
            <Button className="cursor-pointer" onClick={() => navigate("/landing-page")}>Get Back On Track</Button>
        </div>
    );
}