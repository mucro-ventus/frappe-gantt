import { Component, ReactNode, createElement } from "react";
import { EPIUSEFrappePreviewProps } from "../typings/EPIUSEFrappeProps";


export class preview extends Component<EPIUSEFrappePreviewProps> {
    render(): ReactNode {
        return <div></div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/EPIUSEFrappe.css");
}
