import { useState } from "react"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Alert, AlertDescription } from "@/components/ui/alert.tsx"
import { changePassword } from "@/api/api.ts"

interface Props {
    userId: number
    oldPassword: string
    onSuccess: () => void
}

export default function Step2NewPassword({
                                             userId,
                                             onSuccess,
                                         }: Props) {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        try {
            setLoading(true)
            setError("")
            await changePassword(userId, newPassword)
            onSuccess()
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to change password.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <Label>New Password</Label>
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div>
                <Label>Confirm New Password</Label>
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Button
                onClick={handleChange}
                className="w-full cursor-pointer"
                disabled={loading}
            >
                {loading ? "Changing..." : "Change Password"}
            </Button>
        </div>
    )
}