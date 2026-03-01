import { useState } from "react"
import {
    Card,
    CardContent
} from "@/components/ui/card.tsx"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"

import Step1VerifyPassword from "../../components/changePassword/VerifyPassword.tsx"
import Step2NewPassword from "../../components/changePassword/NewPassword.tsx"
import Step3Success from "@/components/changePassword/Success.tsx";

export default function ChangePasswordPage() {
    const [step, setStep] = useState(1)
    const [oldPassword, setOldPassword] = useState("")

    const userId = Number(localStorage.getItem("userId"))

    const renderHeader = () => {
        switch (step) {
            case 1:
                return "Step 1: Verify Current Password"
            case 2:
                return "Step 2: Create New Password"
            case 3:
                return "Password Changed Successfully"
            default:
                return "Change Password"
        }
    }

    const renderBreadcrumb = () => (
        <Breadcrumb className="ml-8 mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage
                        className={step === 1 ? "font-bold text-primary" : ""}
                    >
                        Verify Current Password
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage
                        className={step === 2 ? "font-bold text-primary" : ""}
                    >
                        Enter New Password
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage
                        className={step === 3 ? "font-bold text-primary" : ""}
                    >
                        Success
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )

    return (
        <div className="flex justify-center items-start min-h-[80vh] font-sans pt-12">
            <div className="w-[480px] space-y-6">

                <h1 className="ml-12 text-2xl font-bold">{renderHeader()}</h1>

                {renderBreadcrumb()}

                {/* Step Content Card */}
                <Card>
                    <CardContent className="pt-6">
                        {step === 1 && (
                            <Step1VerifyPassword
                                userId={userId}
                                onSuccess={(password) => {
                                    setOldPassword(password)
                                    setStep(2)
                                }}
                            />
                        )}

                        {step === 2 && (
                            <Step2NewPassword
                                userId={userId}
                                oldPassword={oldPassword}
                                onSuccess={() => setStep(3)}
                            />
                        )}

                        {step === 3 && <Step3Success />}
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}