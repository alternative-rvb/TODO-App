import {getRandomColor} from "./color.js";
import {sanitizeInput} from "./tools.js";

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
    obj.id = `task${Date.now()}`;
    obj.tasks = [];
    for (let i = 0; i < taskForm.elements.length; i++) {
        if (taskForm.elements[i].name) {
            // REVIEW
            if (!taskForm.elements[i].classList.contains("single-task")) {
                obj[taskForm.elements[i].name] = sanitizeInput(
                    taskForm.elements[i].value
                );
            } else if (taskForm.elements[i].value) {
                obj["tasks"].push(sanitizeInput(taskForm.elements[i].value));
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
    data.map((x) => {
        return (tasks.innerHTML += `
      <article id=${
          x.id
      } class="tasks__art d-flex fd-column" style="border-color:${
            x.color
        }" draggable="true">
      <h3 class="tasks__title">${x.title}</h3>
      ${
          x.date
              ? `<p class="tasks__meta"><small>Échéance: <time>${x.date}<time></small></p>`
              : ""
      }
      <ul>
        ${x.tasks
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
            editTask(e);
        });
    });

    const deleteBtn = tasks.querySelectorAll(".delete-task");
    deleteBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            deleteTask(e);
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
    const selectedTask = e.currentTarget.closest(".tasks__art");
    const allTasks = selectedTask.querySelectorAll(".tasks__li");
    const index = data.findIndex((item) => item.id == selectedTask.id);
    console.log("index => ", index);
    if (data[index].tasks.length > 0) {
        for (let i = 1; i < data[index].tasks.length; i++) {
            addInput(inputContainer);
        }
    }
    taskForm.elements.inputTitle.value = data[index].title;
    taskForm.elements.inputDate.value = data[index].date;
    taskForm.elements.inputColor.value = data[index].color;
    allTasks.forEach((item, index) => {
        taskForm.elements[`input-task${index + 1}`].value = item.innerText;
    });

    deleteTask(e);
}

// ANCHOR DELETE TASK
function deleteTask(e) {
    const selectedTask = e.currentTarget.closest(".tasks__art");
    const index = data.findIndex((item) => item.id == selectedTask.id);

    // REVIEW
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
}

function addInput(location) {
    const newInput = document.createElement("div");
    newInput.classList.add("my-1", "d-flex");
    newInput.innerHTML = `
    <input type="text" id="input-task${countInputFields}" class="single-task  flex-1 rounded-left" placeholder="Tâche ${countInputFields}..." name="task1">
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

// ondragstart
// ondragenter
// ondragleave
// ondragend
// ondragover
// ondrop

const allArticles = document.querySelectorAll(".tasks__art");

allArticles.forEach((article) => {
    article.ondragstart = (e) => {
        console.log("e.target START => ", e.target);
        e.target.closest("article").classList.add("drag-start");
        // e.dataTransfer.setData("text/plain", e.target.closest("article").innerHTML);
        // e.currentTarget.style.transform = "scale(.5)";
    };
    article.ondragover = (e) => {
        e.preventDefault();
    };

    article.ondragenter = (e) => {
        console.log("e.target ENTER => ", e.target.closest("article"));
        e.target.closest("article").classList.remove("drag-start");
        // e.target.closest("article").classList.add("drag-enter");
    };

    article.ondragleave = (e) => {
        console.log("e.target LEAVE => ", e.target.closest("article"));
        // e.target.closest("article").classList.remove("drag-enter");
    };

    article.ondrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.target.closest("article").classList.add("drop");
        // e.target.closest("article").innerHTML = e.dataTransfer.getData("text/plain");
    };
    article.ondragend = (e) => {
        e.target.closest("article").classList.remove("drop");
    };
});
