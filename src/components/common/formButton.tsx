'use client'

import { Button } from "@nextui-org/react"
import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

type FormButtonProps = {
    children: ReactNode
}

export default function FormButton({ children }: Readonly<FormButtonProps>) {
    const { pending } = useFormStatus()

    return (
        <Button isLoading={pending} type="submit">
            {children}
        </Button>
    )
}