import { Component, ReactNode, createElement } from "react";
import { FrappeGantt, Task } from "@toyokoh/frappe-gantt-react";
import { EPIUSEFrappeContainerProps } from "typings/EPIUSEFrappeProps";
import { ObjectItem } from "mendix";

export interface EFrappeGantProps {
    data: EPIUSEFrappeContainerProps;
}

export class EFrappeGant extends Component<EFrappeGantProps> {

    populateTask = (item: ObjectItem) : Task => {
        var data = this.props.data;

        var task = new Task();
        task.id = data.TaskId ? data.TaskId.get(item).displayValue : "";
        task.name = data.TaskName ? data.TaskName.get(item).displayValue : "";
        task.start = data.StartDate ? data.StartDate.get(item).displayValue : "";
        task.end = data.EndDate ? data.EndDate.get(item).displayValue : "";
        var progress = data.Progress ? data.Progress.get(item).value?.toNumber() : 0;
        task.progress = progress ? progress : 0;

        return task;
    }

    render(): ReactNode 
    {
        // TODO - Why do we get an error when we don't have this task here?
        var task = new Task();
        task.id = 'Task 1';
        task.name = 'Redesign website';
        task.start = '2016-12-28';
        task.end = '2016-12-31';
        task.progress = 20;
        
        const tasks : Task[] = [];        
        tasks.push(task);

        var items = this.props.data.tasks;
        if(items.items)
        {
            for(const entry of items.items)
            {
                tasks.push(this.populateTask(entry));            
            }        
        }

        return <FrappeGantt tasks={tasks} /> 
    }
}