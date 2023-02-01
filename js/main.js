import {getRandomColor} from "./color.js";

const modalForm = document.querySelector("#modal-form");
const taskForm = document.querySelector("#task-form");
const btnCreate = document.querySelector("#btn-create");
const tasks = document.querySelector("#tasks-container");
const inputContainer = document.querySelector("#inputs-container");
let countInputFields = 0;
console.log("countInputFields => ", countInputFields);
const btnAdd = document.querySelector("#btn-add");
const info = document.querySelector("#info");

// SECTION TODO APP

function noRefresh(e) {
    e.preventDefault();
    e.stopPropagation();
}

btnCreate.addEventListener("click", (e) => {
    noRefresh(e);
    createTasks();
    modalForm.style.display = "block";
    taskForm.inputTitle.focus();
    taskForm.inputColor.value = getRandomColor(50, 50);
});

// ANCHOR HANDLE FORM

// On empêche l'envoi du formulaire avec la touche entrée
modalForm.onkeypress = (e) => {
    let key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        //   alert("No Enter!");
        e.preventDefault();
    }
};

modalForm.querySelector(".add-single").addEventListener("click", (e) => {
    // noRefresh(e);
    addInput(inputContainer);
});
// Lorsqu'on appuie sur entrée on ajoute un autre input
inputContainer.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        // noRefresh(e);
        addInput(inputContainer);
    }
});

modalForm.querySelector(".btn-add").addEventListener("click", (e) => {
    noRefresh(e);
    formValidation();
});

modalForm.querySelector(".btn-reset").addEventListener("click", (e) => {
    // noRefresh(e);
    createTasks();
});

modalForm.querySelector(".btn-close").addEventListener("click", (e) => {
    // noRefresh(e);
    //  REVIEW
    //  let confirmation=  confirm("Voulez-vous vraiment quitter ? Vous allez perdre vos données");
    // if (confirmation) {
    //     modalForm.style.display = "none";
    //     createTasks();
    // }
    modalForm.style.display = "none";
    createTasks();
    info.innerHTML = "";
});

// ANCHOR VALIDATION

function formValidation() {
    if (inputTitle.value === "") {
        console.log("failure");
        inputTitle.focus();
        info.innerHTML = "Task cannot be blank";
        info.classList.add("color-danger");
    } else {
        console.log("success");
        info.innerHTML = "";
        acceptData();
        modalForm.style.display = "none";
        // FIXME
        // btn-add.setAttribute("data-bs-dismiss", "modal");
        // btn-add.click();
        // (() => {
        //   btn-add.setAttribute("data-bs-dismiss", "");
        // })();
    }
}

// ANCHOR ACCEPT DATA

let data = [];
function acceptData() {
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
}

// ANCHOR CREATE TASK | AFFICHAGE | UI
function createTasks() {
    tasks.innerHTML = "";
    btnAdd.innerHTML = "Ajouter";
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
                    return `<li class="tasks__li">${item}</li>`;
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
    // ANCHOR UI

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
            createTasks();
        });
    });

    taskForm.reset();
    inputContainer.innerHTML = "";
    countInputFields = 1;
    addInput(inputContainer);
    console.log("data created", {data});
}

// ANCHOR UPDATE DATA
function editTask(e) {
    modalForm.style.display = "block";
    btnAdd.innerHTML = "Mettre à jour";
    let selectedTask = e.parentElement.parentElement;
    let allTasks = selectedTask.querySelectorAll(".tasks__li");
    if (data[selectedTask.id].task.length > 0) {
        for (let i = 1; i < data[selectedTask.id].task.length; i++) {
            addInput(inputContainer);
        }
    }
    taskForm.elements.inputTitle.value = data[selectedTask.id].title;
    taskForm.elements.inputDate.value = data[selectedTask.id].date;
    taskForm.elements.inputColor.value = data[selectedTask.id].color;
    allTasks.forEach((item, index) => {
        taskForm.elements[`inputTask${index + 1}`].value = item.innerText;
    });

    deleteTask(e);
}

// ANCHOR DELETE TASK
function deleteTask(e) {
    e.parentElement.parentElement.remove();
    // REVIEW
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}

function addInput(location) {
    const newInput = document.createElement("div");
    newInput.classList.add("my-1", "d-flex");
    newInput.innerHTML = `
    <input type="text" id="inputTask${countInputFields}" class="single-task  flex-1 rounded-left" placeholder="Tâche ${countInputFields}..." name="task1">
    <button type="button" class="remove-single btn-default rounded-right">-</button>
    `;
    location.appendChild(newInput);
    newInput.querySelector(".remove-single").addEventListener("click", (e) => {
        console.log("e => ", e);
        // noRefresh(e);
        if (countInputFields > 2) {
            e.target.parentElement.remove();
            countInputFields--;
            console.log("countInputFields => ", countInputFields);
        } else {
            // Sélectionner le premier enfant de inputContainer
            e.target.parentElement.children[0].value = "";
        }
    });
    // Ajouter focus sur le dernier input
    newInput.querySelector(".single-task").focus();
    countInputFields++;
    console.log("countInputFields => ", countInputFields);

    return newInput;
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log("data onLoad", {data});
    createTasks();
})();

// !SECTION
