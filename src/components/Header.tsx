interface HeaderOptions {
    parentID?:string,
    headerID:string,
    textID?:string,
    text?:string
}

export const Header = ({
    parentID = "", 
    headerID = "", 
    textID = "",
    text = ""
}: HeaderOptions) => {
    if (parentID) {
        return (
            <div className={parentID}>
                <div id={headerID}>
                    <div id={textID}>{text}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div id={headerID}>
                <div id={textID}>{text}</div>
            </div>
        )
    }
}