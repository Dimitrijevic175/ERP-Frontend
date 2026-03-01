import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Edit2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert.tsx"
import { getUserById } from "@/api/api.ts"

interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    roleName: string
    active: boolean
}

export default function AccountPage() {
    const userId = Number(localStorage.getItem("userId"))
    const [user, setUser] = useState<User | null>(null)
    const [editingEmail, setEditingEmail] = useState(false)
    const [emailInput, setEmailInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(userId)
                setUser(data)
                setEmailInput(data.email)
            } catch (err: any) {
                setError("Failed to load user data.")
            }
        }
        fetchUser()
    }, [userId])

    const handleEmailUpdate = async () => {
        try {
            setLoading(true)
            setError("")
            // const updated = await updateUserEmail(userId, emailInput)
            // setUser(updated)
            setEditingEmail(false)
            setSuccess(true)

            setTimeout(() => setSuccess(false), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update email.")
        } finally {
            setLoading(false)
        }
    }

    if (!user) return <div>Loading...</div>

    return (
        <div className="flex flex-col items-center pt-12 font-sans space-y-6">

            <h1 className="text-3xl font-bold text-center">Account Information</h1>

            <Card className="pt-5 w-[480px] space-y-6">
                <CardContent className="space-y-4">

                    {/* Email */}
                    <div className="pb-2 flex flex-col space-y-1">
                        <Label className="pb-1">Email</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                disabled={!editingEmail}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (editingEmail) handleEmailUpdate()
                                    else setEditingEmail(true)
                                }}
                                disabled={loading}
                            >
                                <Edit2 className="mr-1 w-4 h-4" />
                                {editingEmail ? "Save" : "Edit"}
                            </Button>
                        </div>
                    </div>

                    {/* First Name */}
                    <div className="pb-2 flex flex-col space-y-1">
                        <Label className="pb-1">First Name</Label>
                        <Input type="text" value={user.firstName} disabled />
                    </div>

                    {/* Last Name */}
                    <div className="pb-2 flex flex-col space-y-1">
                        <Label className="pb-1">Last Name</Label>
                        <Input type="text" value={user.lastName} disabled />
                    </div>

                    {/* Role */}
                    <div className="pb-2 flex flex-col space-y-1">
                        <Label className="pb-1">Role</Label>
                        <Input type="text" value={user.roleName} disabled />
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                </CardContent>
            </Card>

            <div
                className={`transition-opacity duration-500 ${
                    success ? "opacity-100" : "opacity-0"
                } text-green-600`}
            >
                Email updated successfully.
            </div>
        </div>
    )
}