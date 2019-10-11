import { StyleFactory } from "@/typings/css"
import React from "react"

export interface LinkProps {
    active: boolean
    children: string
    onClick: () => void
}

const sx: StyleFactory = {
    root: {
        marginLeft: "4px",
        display: "flex",
        alignContent: "center"
    }
}

export const Link: React.FC<LinkProps> = ({ active, children, onClick }) => (
    <button onClick={onClick} disabled={active} style={sx.root}>
        {children}
    </button>
)
