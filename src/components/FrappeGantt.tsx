import { Component, ReactNode, createElement } from "react";
import { FrappeGantt, Task } from "@toyokoh/frappe-gantt-react";

export interface EFrappeGantProps {
    tasksJson?: string;
}

export class EFrappeGant extends Component<EFrappeGantProps> {
    render(): ReactNode {
        // var task : Task = {
        //     id: 'Task 1',
        //     name: 'Redesign website',
        //     start: '2016-12-28',
        //     end: '2016-12-31',
        //     progress: 20,
        //     dependencies: 'Task 2, Task 3',
        //     custom_class: 'bar-milestone'            
        // };

        var task = new Task();
        task.id = 'Task 1';
        task.name = 'Redesign website';
        task.start = '2016-12-28';
        task.end = '2016-12-31';
        task.progress = 20;

        //   var array : Gantt.Task[] = [];
        //   array.push(task);
        // new Gantt("#gantt", array);

        // const tasks = [ { id: "Task 1", name: "Redesign website", start: "2016-12-28", end: "2016-12-31", progress: 10, dependencies: "", }, { id: "Task 2", name: "Redesign website", start: "2016-12-28", end: "2016-12-31", progress: 20, dependencies: "Task 1", }, { id: "Task 3", name: "Redesign website", start: "2016-12-28", end: "2016-12-31", progress: 0, dependencies: "Task 2, Task 1", }, ];

        const tasks : Task[] = [];
        tasks.push(task);

        return <FrappeGantt tasks={tasks} /> 
    }
}