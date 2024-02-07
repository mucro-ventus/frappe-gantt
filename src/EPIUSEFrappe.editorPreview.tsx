import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { EPIUSEFrappePreviewProps } from "../typings/EPIUSEFrappeProps";


export class preview extends Component<EPIUSEFrappePreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/EPIUSEFrappe.css");
}
