interface Props {
    fade: boolean
}

export function UsersHeader({ fade }: Props) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1
                className={`text-2xl font-bold transition-opacity duration-1000 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                Users
            </h1>
        </div>
    )
}