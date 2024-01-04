import { ReactNode } from "react"

type ContainerProps = {
    children: ReactNode
}

export default function Container({children}: Readonly<ContainerProps>) {
    return <div className="container mx-auto px-4 max-w-6xl">{children}</div>
}