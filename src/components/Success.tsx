import { CheckCircle } from "lucide-react"

export default function Step3Success() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <CheckCircle className="h-20 w-20 text-green-500" />
            <p className="text-lg font-medium text-center">
                You have successfully changed your password.
            </p>
        </div>
    )
}