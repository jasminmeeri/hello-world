const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");

// Gives user an alert if they try to add an empty task, otherwise adds the task to the list
function AddTask(){
    if(inputBox.value === ''){
        alert("You must write something here!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        // Creates a span element to add a delete button, a cross to each task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    // Clears the input box after adding a task, otherwise task would be still shown there. Also saving the data to local storage so that it doesn't disappear when closing the tab or refreshing the page
    inputBox.value = "";
    saveData();
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false);

//have to save the data, otherwise it dissappears when closing tab or refreshing the page
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();