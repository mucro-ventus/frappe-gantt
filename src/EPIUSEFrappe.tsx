import { Component, ReactNode, createElement } from "react";
import { EFrappeGant } from "./components/FrappeGantt";

import { EPIUSEFrappeContainerProps } from "../typings/EPIUSEFrappeProps";

import "./ui/EPIUSEFrappe.css";
import { ViewMode } from "@toyokoh/frappe-gantt-react";

export class EPIUSEFrappe extends Component<EPIUSEFrappeContainerProps> 
{
    getViewMode = () : ViewMode => {
        var mode : ViewMode;
        switch(this.props.ViewMode)
        {
            case "Week":
                mode = ViewMode.Week;
                break;
            case "Day":
                mode = ViewMode.Day;
                break;
            case "HalfDay":
                mode = ViewMode.HalfDay;
                break;
            case "Month":
                mode = ViewMode.Month;
                break;
            case "QuarterDay":
                mode = ViewMode.QuarterDay;
                break;
            default:
                mode = ViewMode.Day;
        }

        return mode;
    }

    
    render(): ReactNode 
    {
        
        
        return <div className="gantt-container">
                <EFrappeGant 
                    data={this.props} 
                    viewMode={this.getViewMode()} />
            </div>;
    }
}
