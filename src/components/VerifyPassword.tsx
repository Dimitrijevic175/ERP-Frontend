import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { verifyPassword } from "@/api/api"

interface Props {
    userId: number
    onSuccess: (oldPassword: string) => void
}

export default function Step1VerifyPassword({ userId, onSuccess }: Props) {
    const [oldPassword, setOldPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleVerify = async () => {
        try {
            setLoading(true)
            setError("")
            await verifyPassword(userId, oldPassword)
            onSuccess(oldPassword)
        } catch (err: any) {
            setError(err.response?.data?.message || "Incorrect password.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <Label>Current Password</Label>
                <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Button
                onClick={handleVerify}
                className="w-full cursor-pointer"
                disabled={loading}
            >
                {loading ? "Verifying..." : "Continue"}
            </Button>
        </div>
    )
}