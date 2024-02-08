import { Component, ReactNode, createElement } from "react";
import { EFrappeGant } from "./components/FrappeGantt";

import { EPIUSEFrappeContainerProps } from "../typings/EPIUSEFrappeProps";

import "./ui/EPIUSEFrappe.css";
import { ViewMode } from "@toyokoh/frappe-gantt-react";

/**
 * Main widget container for the Frappe Gantt chart
 */
export class EPIUSEFrappe extends Component<EPIUSEFrappeContainerProps> 
{
    /**
     * Converts the ViewMode value received from Mendix into the enum expected by the chart
     * @returns ViewMode enum value
     */
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
    
    /**
     * Render the widget
     * @returns ReactNode instance
     */
    render(): ReactNode 
    {   
        return <div className="gantt-container">
                <EFrappeGant 
                    data={this.props} 
                    viewMode={this.getViewMode()} />
            </div>;
    }
}
