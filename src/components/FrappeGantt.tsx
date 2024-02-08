import { Component, ReactNode, createElement } from "react";
import { FrappeGantt, Task, ViewMode } from "@toyokoh/frappe-gantt-react";
import { EPIUSEFrappeContainerProps } from "typings/EPIUSEFrappeProps";
import { ObjectItem } from "mendix";

export interface EFrappeGantProps {
    data: EPIUSEFrappeContainerProps;
    viewMode: ViewMode;
}

export class EFrappeGant extends Component<EFrappeGantProps> {

    populateTask = (item: ObjectItem) : Task => {
        var data = this.props.data;

        var task = new Task();
        task.id = data.TaskId ? data.TaskId.get(item).displayValue : "";
        task.name = data.TaskName ? data.TaskName.get(item).displayValue : "";
        task.start = data.StartDate ? data.StartDate.get(item).displayValue : "";
        task.end = data.EndDate ? data.EndDate.get(item).displayValue : "";
        task.dependencies = data.Dependencies ? data.Dependencies.get(item).displayValue : "";
        var progress = data.Progress ? data.Progress.get(item).value?.toNumber() : 0;
        task.progress = progress ? progress : 0;

        var customClass = data.CustomClass ? data.CustomClass.get(item).displayValue : "";
        if(customClass != "")
        {
            task.custom_class = customClass;
        }

        return task;
    }

    render(): ReactNode 
    {        
        const tasks : Task[] = [];        

        var items = this.props.data.tasks;
        if(items.items)
        {
            for(const entry of items.items)
            {
                tasks.push(this.populateTask(entry));            
            }
        }

        console.trace("Task count: " + tasks.length);
        // If there are no tasks return an empty div, otherwise the widget won't render
        if (tasks.length == 0)
        {
            return <div></div>
        }

        return <FrappeGantt 
        tasks={tasks} 
        viewMode={this.props.viewMode} /> 
    }
}