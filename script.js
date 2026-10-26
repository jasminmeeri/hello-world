// Get the form elements and task list.
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskForm = document.getElementById("task-form");
const inputError = document.getElementById("input-error");
const taskFilters = document.querySelector(".task-filters");
const minimumTaskLength = 3;
let currentFilter = "all";

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = inputBox.value.trim();

    // Check that the text typed in is long enough before adding it.
    if (taskText.length < minimumTaskLength) {
        taskForm.classList.add("error");
        inputBox.setAttribute("aria-invalid", "true");
        inputError.textContent = taskText.length === 0
            ? "Enter a task."
            : `Enter at least ${minimumTaskLength} characters.`;
        inputError.hidden = false;
        inputBox.focus();
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
    updateTaskVisibility();
    inputBox.value = "";
    taskForm.classList.remove("error");
    inputBox.setAttribute("aria-invalid", "false");
    inputError.hidden = true;
    inputError.textContent = "";
    saveData();
});

inputBox.addEventListener("input", function () {
    if (inputBox.value.trim().length >= minimumTaskLength) {
        taskForm.classList.remove("error");
        inputBox.setAttribute("aria-invalid", "false");
        inputError.hidden = true;
        inputError.textContent = "";
    }
});

taskFilters.addEventListener("click", function (event) {
    const selectedButton = event.target.closest("button[data-filter]");
    if (!selectedButton) {
        return;
    }

    currentFilter = selectedButton.dataset.filter;
    taskFilters.querySelectorAll("button[data-filter]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button === selectedButton));
    });
    updateTaskVisibility();
});

// Mark a task as complete or remove it when clicked.
listContainer.addEventListener("click", function (e) {
    const clickedItem = e.target.closest("li");
    const deleteButton = e.target.closest("span");

    if (deleteButton) {
        deleteButton.parentElement.remove();
        saveData();
        return;
    }

    if (clickedItem) {
        clickedItem.classList.toggle("checked");
        updateTaskVisibility();
        saveData();
    }
}, false);

function updateTaskVisibility() {
    listContainer.querySelectorAll("li").forEach(function (task) {
        const isCompleted = task.classList.contains("checked");
        task.hidden = currentFilter === "active"
            ? isCompleted
            : currentFilter === "completed" && !isCompleted;
    });
}

// Have to save the data, otherwise it disappears when closing tab or refreshing the page.
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    // Restore saved tasks when the page loads.
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
    updateTaskVisibility();
}

showTask();