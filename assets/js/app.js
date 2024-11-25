"use strict";

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, element, callback) {
    return element.addEventListener(event, callback);
}

const tasks = [];
const taskError = select(".task-error");
const taskList = select(".todo-list");
const taskInput = select(".task-input");
const dateInput = select(".date-input");
const timeInput = select(".time-input");
const priorityInput = select(".priority-input");
const addTaskButton = select("input[name='add-task']");

class Task {
    constructor(taskName, date, time, priority) {
        this.taskName = taskName;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.alarmSet = false;
    }
}

function displayError(message) {
    taskError.textContent = message;
    taskError.classList.remove("hidden");
}

function hideErrors() {
    taskError.classList.add("hidden");
}

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

function addTask() {
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

function listTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task-box ${task.priority.toLowerCase()}`;
        taskDiv.innerHTML = `
            <p><strong>${task.taskName}</strong></p>
            <p>Due: ${task.date} at ${task.time}</p>
            <p>Priority: ${task.priority}</p>
        `;

       
        listen("click", taskDiv, () => deleteTask(index));

      

        taskList.appendChild(taskDiv);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    listTasks();
}

function setAlarm(task) {
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


