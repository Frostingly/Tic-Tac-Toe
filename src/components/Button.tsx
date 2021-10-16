import { MouseEventHandler } from "react"

interface ButtonOptions {
    outerParentID?:string
    innerParentID?:string,
    buttonID:string,
    onClick?:MouseEventHandler,
    children?:string
}

export const Button = ({
    outerParentID = "",
    innerParentID = "",
    buttonID = "",
    onClick = () => {
        console.log("This is a default function, you did not specify a onClick prop or a function.")
    },
    children = ""
}: ButtonOptions) => {
    return (
        <div className={outerParentID}>
            <div className={innerParentID}>
                <button id={buttonID} onClick={onClick}>{children}</button>
            </div>
        </div>
    )
}