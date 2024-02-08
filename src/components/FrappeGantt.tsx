import { Component, ReactNode, createElement } from "react";
import { FrappeGantt, Task, ViewMode } from "@toyokoh/frappe-gantt-react";
import { EPIUSEFrappeContainerProps } from "typings/EPIUSEFrappeProps";
import { ObjectItem, ActionValue } from "mendix";
import { Moment } from "moment";
import Big from "big.js";
import moment from "moment";


/**
 * Props for the EFrappeGantt class
 */
export interface EFrappeGantProps {
    
    // Props that are passed in from Mendix
    data: EPIUSEFrappeContainerProps;
    
    // The mode in which to display the chart
    viewMode: ViewMode;
}

/**
 * Main class that creates the tasks and set up the Gantt chart
 */
export class EFrappeGant extends Component<EFrappeGantProps> 
{
    // Collection of Tasks being displayed
    tasks : Task[] = [];

    // Collection of tasks received from Mendix
    currentTasks : ObjectItem[] = [];


    /**
     * Creates and populates a Task from an entity
     * @param item The entity from which to create a Task
     * @returns Populated task for the provided entity
     */
    populateTask = (item: ObjectItem) : Task => 
    {
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

    /*
     * Method that assist in executing ActionValue actions
     */
    executeAction = (action?: ActionValue): void => {
        if (action && action.canExecute && !action.isExecuting) {
            action.execute();
        }
    }

    /**
     * Event that is triggered when the user clicks on a Task
     * @param task The task that was updated
     * @param progress The updated progress value
     */
    onProgressChangedEvent = (task: Task, progress: number) : void =>
    {
        console.debug("Firing onProgressChanged event. Progress changed to " + progress);
        if(this.props.data.onProgressChanged && this.props.data.eventTaskId)
        {                       
            var collectionTask = this.tasks.find(x => x.id == task.id);
            if(collectionTask)
            {
                collectionTask.progress = progress;
            }
            this.props.data.eventTaskId.setValue(task.id);
            this.props.data.updatedProgress?.setValue(new Big(progress));
            this.executeAction(this.props.data.onProgressChanged);
        }
        else
        {
            console.warn("onProgressChanged action or eventTaskId is not defined, cannot return change to Mendix");
        }
    }

    /**
     * Event that is triggered when the user changes an entries date
     * @param task The task that was updated
     * @param start The new start date for the task
     * @param end The new end date for the task
     */
    onDateChangedEvent = (task: Task, start: Moment, end: Moment) : void => 
    {
        console.debug("Firing onDateChangedEvent for task " + task.id + ". Date range changed to " + start + " - " + end);
        var collectionTask = this.tasks.find(x => x.id == task.id);
        if(collectionTask)
        {
            collectionTask.start = moment(start).format("YYYY-MM-DD");
            collectionTask.end = moment(end).format("YYYY-MM-DD");
        }
        if(this.props.data.onDateChanged 
            && this.props.data.eventTaskId
            && this.props.data.updatedStartDate 
            && this.props.data.updatedEndDate)
        {
            this.props.data.eventTaskId.setValue(task.id);
            this.props.data.updatedStartDate.setTextValue(moment(start).format("YYYY-MM-DD"));
            this.props.data.updatedEndDate.setTextValue(moment(end).format("YYYY-MM-DD"));
            this.executeAction(this.props.data.onDateChanged);
        }
        else
        {
            console.warn("onDateChanged action, eventTaskId, updatedStartDate or updatedEndDate is not defined, cannot return change to Mendix");
        }
    }

    /**
     * Event that is triggered when a user double clicks a task
     * @param task The task that was clicked
     */
    onClickEvent = (task: Task) : void => 
    {
        console.debug("Firing onClick event for task " + task.id);
        if(this.props.data.onClick && this.props.data.eventTaskId)
        {
            this.props.data.eventTaskId.setValue(task.id);
            this.executeAction(this.props.data.onClick);
        }
        else
        {
            console.warn("onClick or eventTaskId is not defined, cannot return onClick event to Mendix");
        }
    }

    /**
     * Render the widget
     * @returns ReactNode instance
     */
    render(): ReactNode 
    {   
        var items = this.props.data.tasks;
        if(items.items)
        {
            var isSame = (this.currentTasks.length == items.items.length) && this.currentTasks.every(function(element, index) 
            {
                if(items.items)
                {
                    return element === items.items[index]; 
                }
                return false;
            });

            // Do not rebuild the tasks if the data received from Mendix is the same as what we have - Otherwise it messes with our events
            if(!isSame)
            {
                this.tasks = [];
                this.currentTasks = items.items;
                for(const entry of items.items)
                {
                    this.tasks.push(this.populateTask(entry));            
                }
            }
        }

        // If there are no tasks return an empty div, otherwise the widget won't render
        if (this.tasks.length == 0)
        {
            return <div></div>
        }

        return <FrappeGantt 
        tasks={this.tasks} 
        viewMode={this.props.viewMode}
        onProgressChange={this.onProgressChangedEvent}
        onDateChange={this.onDateChangedEvent}
        onClick={this.onClickEvent} /> 
    }    
}