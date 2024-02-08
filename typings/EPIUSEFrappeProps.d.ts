/**
 * This file was generated from EPIUSEFrappe.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type ViewModeEnum = "QuarterDay" | "HalfDay" | "Day" | "Week" | "Month";

export interface EPIUSEFrappeContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    ViewMode: ViewModeEnum;
    tasks: ListValue;
    TaskId: ListAttributeValue<string>;
    TaskName: ListAttributeValue<string>;
    StartDate: ListAttributeValue<string>;
    EndDate: ListAttributeValue<string>;
    Progress: ListAttributeValue<Big>;
    Dependencies: ListAttributeValue<string>;
    CustomClass?: ListAttributeValue<string>;
}

export interface EPIUSEFrappePreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    ViewMode: ViewModeEnum;
    tasks: {} | { caption: string } | { type: string } | null;
    TaskId: string;
    TaskName: string;
    StartDate: string;
    EndDate: string;
    Progress: string;
    Dependencies: string;
    CustomClass: string;
}
