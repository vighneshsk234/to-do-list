/* =========================
   TASK DATA
========================= */

let tasks = [];

let currentFilter = "all";


/* =========================
   GET HTML ELEMENTS
========================= */

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const activeTasks = document.getElementById("activeTasks");

const completedTasks = document.getElementById("completedTasks");

const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* =========================
   ADD TASK
========================= */

function addTask() {

    const taskText = taskInput.value.trim();


    // Prevent empty tasks
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create a new task object
    const newTask = {

        id: Date.now(),

        title: taskText,

        completed: false

    };


    // Add task to array
    tasks.push(newTask);


    // Clear input
    taskInput.value = "";


    // Display tasks
    renderTasks();

}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    renderTasks();

}


/* =========================
   COMPLETE / UNDO TASK
========================= */

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {

                ...task,

                completed: !task.completed

            };

        }


        return task;

    });


    renderTasks();

}


/* =========================
   EDIT TASK
========================= */

function editTask(id) {

    const task = tasks.find(function(task) {

        return task.id === id;

    });


    if (!task) {
        return;
    }


    const newTitle = prompt(
        "Edit your task:",
        task.title
    );


    if (newTitle === null) {
        return;
    }


    const updatedTitle = newTitle.trim();


    if (updatedTitle === "") {

        alert("Task cannot be empty.");

        return;
    }


    task.title = updatedTitle;


    renderTasks();

}


/* =========================
   FILTER TASKS
========================= */

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(function(task) {

            return !task.completed;

        });

    }


    if (currentFilter === "completed") {

        return tasks.filter(function(task) {

            return task.completed;

        });

    }


    return tasks;

}


/* =========================
   RENDER TASKS
========================= */

function renderTasks() {

    // Clear existing list
    taskList.innerHTML = "";


    // Get tasks according to filter
    const filteredTasks = getFilteredTasks();


    /* =========================
       EMPTY MESSAGE
    ========================= */

    if (filteredTasks.length === 0) {

        const emptyMessage =
            document.createElement("li");

        emptyMessage.className =
            "empty-message";


        if (currentFilter === "all") {

            emptyMessage.textContent =
                "No tasks yet. Add your first task!";

        }
        else if (currentFilter === "active") {

            emptyMessage.textContent =
                "No active tasks.";

        }
        else {

            emptyMessage.textContent =
                "No completed tasks.";

        }


        taskList.appendChild(emptyMessage);

    }


    /* =========================
       CREATE TASK ITEMS
    ========================= */

    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task-item";


        // Add completed class
        if (task.completed) {

            li.classList.add("completed");

        }


        /* =========================
           TASK CONTENT
        ========================= */

        const taskTitle =
            document.createElement("span");

        taskTitle.className =
            "task-title";

        taskTitle.textContent =
            task.title;


        /* =========================
           BUTTON CONTAINER
        ========================= */

        const buttonContainer =
            document.createElement("div");

        buttonContainer.className =
            "task-buttons";


        /* =========================
           COMPLETE BUTTON
        ========================= */

        const completeBtn =
            document.createElement("button");

        completeBtn.className =
            "complete-btn";

        completeBtn.textContent =
            task.completed
                ? "Undo"
                : "Complete";


        completeBtn.addEventListener(
            "click",
            function() {

                toggleTask(task.id);

            }
        );


        /* =========================
           EDIT BUTTON
        ========================= */

        const editBtn =
            document.createElement("button");

        editBtn.className =
            "edit-btn";

        editBtn.textContent =
            "Edit";


        editBtn.style.backgroundColor =
            "#f59e0b";


        editBtn.addEventListener(
            "click",
            function() {

                editTask(task.id);

            }
        );


        /* =========================
           DELETE BUTTON
        ========================= */

        const deleteBtn =
            document.createElement("button");

        deleteBtn.className =
            "delete-btn";

        deleteBtn.textContent =
            "Delete";


        deleteBtn.addEventListener(
            "click",
            function() {

                deleteTask(task.id);

            }
        );


        /* =========================
           ADD BUTTONS
        ========================= */

        buttonContainer.appendChild(
            completeBtn
        );

        buttonContainer.appendChild(
            editBtn
        );

        buttonContainer.appendChild(
            deleteBtn
        );


        /* =========================
           ADD TO TASK ITEM
        ========================= */

        li.appendChild(taskTitle);

        li.appendChild(buttonContainer);


        /* =========================
           ADD TO TASK LIST
        ========================= */

        taskList.appendChild(li);

    });


    // Update statistics
    updateStats();

}


/* =========================
   UPDATE STATISTICS
========================= */

function updateStats() {

    // Total tasks
    totalTasks.textContent =
        tasks.length;


    // Completed tasks
    completedTasks.textContent =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    // Active tasks
    activeTasks.textContent =
        tasks.filter(function(task) {

            return !task.completed;

        }).length;

}


/* =========================
   CLEAR COMPLETED TASKS
========================= */

clearCompletedBtn.addEventListener(
    "click",
    function() {

        tasks = tasks.filter(function(task) {

            return !task.completed;

        });


        renderTasks();

    }
);


/* =========================
   FILTER BUTTONS
========================= */

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            // Change current filter
            currentFilter =
                button.dataset.filter;


            // Remove active class
            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            // Add active class
            button.classList.add(
                "active"
            );


            // Render filtered tasks
            renderTasks();

        }
    );

});


/* =========================
   ADD TASK BUTTON
========================= */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* =========================
   ENTER KEY SUPPORT
========================= */

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* =========================
   INITIAL RENDER
========================= */

renderTasks();