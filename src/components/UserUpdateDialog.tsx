import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { getRoles, updateUser } from "@/api/api"
import type { RoleResponse, UserResponse } from "@/model/User"

interface UserUpdateDialogProps {
    user: UserResponse
    open: boolean
    onOpenChange: (open: boolean) => void
    onUpdate: () => void
}

export default function UserUpdateDialog({
                                             user,
                                             open,
                                             onOpenChange,
                                             onUpdate,
                                         }: UserUpdateDialogProps) {
    const [roles, setRoles] = useState<RoleResponse[]>([])
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        roleName: "",
        active: true,
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open) {
            setForm({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roleName: user.roleName,
                active: user.active,
            })
        }
    }, [open, user])

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles()
                setRoles(data)
            } catch (err) {
                console.error("Failed to fetch roles", err)
            }
        }
        fetchRoles()
    }, [])

    const handleSave = async () => {
        setLoading(true)
        try {
            await updateUser(user.id, form)
            onUpdate()
            onOpenChange(false)
        } catch (err) {
            console.error("Failed to update user", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                {/* Ostatak dialoga ostaje isti */}
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Modify the user details below. All changes will be saved upon clicking Save.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-2">
                        <Label>Email</Label>
                        <Input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type="email"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label>First Name</Label>
                            <Input
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Last Name</Label>
                            <Input
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label>Role</Label>
                            <Select
                                value={form.roleName}
                                onValueChange={(value) => setForm({ ...form, roleName: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <Checkbox
                                className="cursor-pointer"
                                checked={form.active}
                                onCheckedChange={(checked) => setForm({ ...form, active: !!checked })}
                            />
                            <Label>Active</Label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button className="cursor-pointer" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button className="cursor-pointer" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}