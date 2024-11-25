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
### simple page design 
