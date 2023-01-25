import {getRandomColor} from "./color.js";

const modalForm = document.querySelector("#modalForm");
const btnToOPen = document.querySelector("#btn-create");
const btnToClose = document.querySelectorAll(".btn-close");
const btnToAdd = document.querySelector("#btn-add");
const btnToDelete = document.querySelector("#btn-delete");
const taskForm = document.querySelector("#task-form");
const inputContainer = document.querySelector(".input-container");
let count = 0;
const info = document.querySelector("#info");
const tasks = document.querySelector("#tasks");
const initInfo = "Pour créer une tâche appuyer sur +";


const noRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

btnToOPen.addEventListener("click", (e) => {
    noRefresh(e);
    modalForm.style.display = "block";
    resetForm();
    inputContainer.innerHTML = "";
    count = 1;
    addInput(inputContainer);
});



modalForm.addEventListener("click", (e) => {
    noRefresh(e);
    console.log('e.target => ', e.target);

    if (e.target.classList.contains("add-single")) {

        addInput(inputContainer);
    } else if (e.target.closest(".btn-add")) {
        formValidation();
    } else if (e.target.closest(".btn-delete")) {
        document.location.reload();
    } else if (e.target.closest(".btn-close")) {
        document.location.reload();
    }
});

const formValidation = () => {
    if (inputTitle.value === "") {
        console.log("failure");
        info.innerHTML = "Task cannot be blank";
        info.classList.add("color-danger");
    } else {
        console.log("success");
        info.innerHTML = "";
        acceptData();
        modalForm.style.display = "none";
    }
};

// ANCHOR ACCEPT DATA

let data = [];
const acceptData = () => {
    let obj = {};
    obj.task = [];
    for (let i = 0; i < taskForm.elements.length; i++) {
        if (taskForm.elements[i].name) {
            // REVIEW
            if (!taskForm.elements[i].classList.contains("single-task")) {
                obj[taskForm.elements[i].name] = taskForm.elements[i].value;
            } else if (taskForm.elements[i].value) {
                obj["task"].push(taskForm.elements[i].value);
            }
        }
    }
    data.unshift({
        ...obj,
    });

    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

// ANCHOR CREATE TASK | Display tasks | Tasks post management
const createTasks = () => {
    tasks.innerHTML = "";
    btnToAdd.innerHTML = "Add";
    data.map((x, y) => {
        return (tasks.innerHTML += `
      <article id=${y} class="tasks__art d-flex fd-column" style="border-color:${
            x.color
        }">
      <h3 class="tasks__title">${x.title}</h3>
      ${
          x.date
              ? `<p class="tasks__meta"><small>Échéance: <time>${x.date}<time></small></p>`
              : ""
      }
      <ul>
        ${x.task
            .map((item) => {
                if (item) {
                    return `<li class="tasks__task">${item}</li>`;
                }
            })
            .join("")}
      </ul>
      <form class="text-right mt-auto">
        <button class="edit-task btn-square" >
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-task btn-square" >
          <i class="fas fa-trash-alt"></i>
        </button>
      </form>
      </article>
      `);
    });

    const edit = tasks.querySelectorAll(".edit-task");
    edit.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            editTask(e.currentTarget);
        });
    });

    const deleteBtn = tasks.querySelectorAll(".delete-task");
    deleteBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            deleteTask(e.currentTarget);
            // newInput.innerHTML = "";
            // count = 1;
            document.location.reload();
        });
    });

    resetForm();
    inputContainer.innerHTML = "";
    count = 1;
    console.log("data when create", {data});
};

// ANCHOR UPDATE DATA
const editTask = (e) => {
    count = 1;
    // inputContainer.innerHTML = "";
    modalForm.style.display = "block";
    btnToAdd.innerHTML = "Update";
    let selectedTask = e.parentElement.parentElement;
    let allTasks = selectedTask.querySelectorAll(".tasks__task");
    if (data[selectedTask.id].task.length > 0) {
        for (let i = 0; i < data[selectedTask.id].task.length; i++) {
            addInput(inputContainer);
        }
    } else {
        addInput(inputContainer);
    }
    taskForm.elements.inputTitle.value = data[selectedTask.id].title;
    taskForm.elements.inputDate.value = data[selectedTask.id].date;
    taskForm.elements.inputColor.value = data[selectedTask.id].color;
    allTasks.forEach((item, index) => {
        taskForm.elements[`inputTask${index + 1}`].value = item.innerText;
    });

    deleteTask(e);
};

// ANCHOR DELETE TASK
const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    // REVIEW
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    // inputContainer.innerHTML = "";
    // count = 1;
    // addInput(inputContainer);
};

// ANCHOR RESET FORM
const resetForm = () => {
    let allTasks = taskForm.querySelectorAll(".single-task");
    taskForm.elements.inputTitle.value = "";
    taskForm.elements.inputDate.value = "";
    taskForm.elements.inputColor.value = getRandomColor(50, 50);
    allTasks.forEach((item) => (item.value = ""));
};

function addInput(location) {
    const newInput = document.createElement("div");
    newInput.classList.add("my-1", "d-flex");
    newInput.innerHTML = `
        <input type="text" id="inputTask${count}" class="single-task rounded-left" placeholder="Your task ${count}..." name="task1">
        <button type="button" class="add-single btn-default rounded-right">+</button>
        `;
    location.appendChild(newInput);
    count++;
    return newInput;
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log("data at first time", {data});
    createTasks();
})();

