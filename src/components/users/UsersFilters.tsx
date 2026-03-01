import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

import type { RoleResponse } from "@/model/User"

interface Props {
    filters: {
        email: string
        roleName: string
    }
    setFilters: (filters: any) => void
    roles: RoleResponse[]
    onSearch: () => void
}

export function UsersFilters({
                                 filters,
                                 setFilters,
                                 roles,
                                 onSearch
                             }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
            <div>
                <Label>Email</Label>
                <Input
                    value={filters.email}
                    onChange={(e) =>
                        setFilters({ ...filters, email: e.target.value })
                    }
                />
            </div>

            <div>
                <Label>Role</Label>
                <Select
                    value={filters.roleName || "all"}
                    onValueChange={(value) =>
                        setFilters({ ...filters, roleName: value })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All roles" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.name}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-end">
                <Button onClick={onSearch}>Search</Button>
            </div>
        </div>
    )
}