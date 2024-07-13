import { TriangleAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface FormErrorProps {
    title?: string
    message?: string
}

export const FormError = ({
    title,
    message
}: FormErrorProps) => {
    if (!message && !title) return null;

    return (
        <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}