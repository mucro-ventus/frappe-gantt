import { Component, ReactNode, createElement } from "react";
import { EFrappeGant } from "./components/FrappeGantt";

import { EPIUSEFrappeContainerProps } from "../typings/EPIUSEFrappeProps";

import "./ui/EPIUSEFrappe.css";

export class EPIUSEFrappe extends Component<EPIUSEFrappeContainerProps> {
    
    render(): ReactNode {
        return <EFrappeGant tasksJson="" />;
    }
}
