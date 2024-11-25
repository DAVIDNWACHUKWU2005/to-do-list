# To-do List Project

This is a simple to-do list application built with HTML, CSS, and JavaScript. The application allows users to add tasks with priorities and deadlines, view the list of tasks, and get notified when a task is due.

## Features
- Add tasks with a name, date, time, and priority.
- Automatically notify users when a task is due.
- Delete tasks by clicking on them.

### simple page structure

- this page has a simple page layout just with the options to select time ,the task and the date.

``` <body>
    <div class="container">
        <div class="grid-center">
            <h1>To-do List</h1>
            <form class="list">
                <input type="text" class="task-input" placeholder="Task name">
                <input type="date" class="date-input">
                <input type="time" class="time-input">
                <select class="priority-input">
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <input type="button" value="Add Task" name="add-task">
        </div>
        <div class="grid-center">
        <div class="todo-list"></div>
    </div>
    <div class="error-messages">
        <p class="hidden task-error red">Please fill in all task details.</p>
    </div>
    </div>
</body>
```
### simple javascript

The web validates all user input by making sure all fields are filled

```
function validateTaskInputs() {
    const taskName = taskInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const priority = priorityInput.value;

    if (!taskName || !date || !time || !priority) {
        displayError("Please fill in all task details.");
        return null;
    }

    return { taskName, date, time, priority };
}
this code is used to add a task and hides errors if the user fills all fields

```function addTask() {
    const taskDetails = validateTaskInputs();

    if (!taskDetails) return;

    hideErrors();

    const { taskName, date, time, priority } = taskDetails;
    const newTask = new Task(taskName, date, time, priority);
    tasks.unshift(newTask);

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    priorityInput.value = "Medium";

    listTasks();
    setAlarm(newTask);
}
this section of code is very important. this part creates a message saying the task is due at the specific time of the future which the task is set

```function setAlarm(task) {
    if (task.alarmSet) return;

    const taskTime = new Date(`${task.date}T${task.time}`);
    const now = new Date();

    const timeUntilTask = taskTime - now;

    if (timeUntilTask > 0) {
        task.alarmSet = true;

        setTimeout(() => {
            const notification = document.createElement("div");
            notification.className = "notification";
            notification.textContent = `Task "${task.taskName}" is due `;

            document.body.appendChild(notification);

    
            setTimeout(() => notification.remove(), 5000);
        }, timeUntilTask);
    }
}
