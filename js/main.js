import {getRandomColor} from "./color.js";
import {sanitizeInput, noRefresh, findIndexOfElmt} from "./utilities.js";
// import {noRefresh} from "./tools.js";

const modalForm = document.querySelector("#modal-form");
const taskForm = document.querySelector("#list-form");
const btnCreate = document.querySelector("#btn-create");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const listsContainer = document.querySelector("#lists-container");
const inputsContainer = document.querySelector("#inputs-container");
let data = [];
let countInputs = 0;
let updatedIndex = "";
const info = document.querySelector("#info");

// SECTION TODO APP

// ANCHOR UI

btnCreate.addEventListener("click", (e) => {
    noRefresh(e);
    createList();
    modalForm.style.display = "block";
    taskForm.classList.add("fx-scale-out");
    taskForm.inputTitle.focus();
    taskForm.inputColor.value = getRandomColor(50, 50);
});

btnDeleteAll.addEventListener("click", (e) => {
    noRefresh(e);
    if (
        window.confirm(
            "Voulez-vous vraiment quitter ? Vous allez perdre vos données"
        )
    ) {
        localStorage.clear();
        data = [];
        createList();
    }
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
    noRefresh(e);
    addInput(inputsContainer);
});

// Lorsqu'on appuie sur entrée on ajoute un autre input
inputsContainer.addEventListener("keyup", (e) => {
    noRefresh(e);
    if (e.key === "Enter") {
        addInput(inputsContainer);
    }
    if (e.ctrlKey && e.key === "Enter") {
        formValidation();
    }
});

modalForm.querySelector(".btn-validation").addEventListener("click", (e) => {
    noRefresh(e);
    formValidation();
});

modalForm.querySelector(".btn-reset").addEventListener("click", (e) => {
    noRefresh(e);
    createList();
});

modalForm.querySelector(".btn-close").addEventListener("click", (e) => {
    if (
        window.confirm(
            "Voulez-vous vraiment quitter ? Vous allez perdre vos données"
        )
    ) {
        modalForm.style.display = "none";
        createList();
        info.innerHTML = "";
    }
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
        // btn-validation.setAttribute("data-bs-dismiss", "modal");
        // btn-validation.click();
        // (() => {
        //   btn-validation.setAttribute("data-bs-dismiss", "");
        // })();
    }
}

// ANCHOR ACCEPT DATA

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
                // obj["tasks"].push(sanitizeInput(taskForm.elements[i].value));
                obj.tasks.push({
                    isChecked:
                        taskForm.elements[i].dataset.checked === "true"
                            ? "true"
                            : "false",
                    task: sanitizeInput(taskForm.elements[i].value),
                });
            }
        }
    }
    // data.unshift(obj);

    if (updatedIndex !== "") {
        data.splice(updatedIndex, 0, obj);
        updatedIndex = "";
    } else {
        data.unshift(obj);
    }

    localStorage.setItem("data", JSON.stringify(data));
    createList();
}

// ANCHOR CREATE LIST | AFFICHAGE | UI
function createList() {
    listsContainer.innerHTML = "";
    document.querySelector("#btn-validation").innerHTML = "Ajouter";
    data.map((x) => {
        return (listsContainer.innerHTML += `
      <article id=${
          x.id
      } class="tasks__art d-flex fd-column" style="border-color:${
            x.color
        }" draggable="true" data-color="${x.color}">
      <h3 class="tasks__title">${x.title}</h3>
      ${
          x.date
              ? `<p class="tasks__meta"><small>Échéance: <time>${x.date}</time></small></p>`
              : ""
      }
      <ul>
        ${x.tasks
            .map((y) => {
                return `<li class="tasks__li ${
                    y.isChecked === "true" ? "checked" : ""
                }" data-checked="${
                    y.isChecked === "true" ? "true" : "false"
                }">${y.task}</li>`;
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

    const edit = listsContainer.querySelectorAll(".edit-task");
    edit.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            updateList(e);
        });
    });

    const resetBtn = listsContainer.querySelectorAll(".delete-task");
    resetBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            deleteList(e);
            createList();
        });
    });

    const tasksLi = listsContainer.querySelectorAll(".tasks__li");
    tasksLi.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            checkTask(e);
        });
    });

    tasksLi.forEach((item) => {
        item.addEventListener("dblclick", (e) => {
            noRefresh(e);
            deleteTask(e);
        });
    });

    taskForm.reset();
    inputsContainer.innerHTML = "";
    countInputs = 1;
    addInput(inputsContainer);
    console.log("data created", {data});
}

// ANCHOR UPDATE LIST
function updateList(e) {
    modalForm.style.display = "block";
    taskForm.classList.add("fx-scale-out");
    document.querySelector("#btn-validation").innerHTML = "Mettre à jour";
    const currentList = e.currentTarget.closest(".tasks__art");
    const index = findIndexOfElmt(currentList.id, data);
    const allTasks = currentList.querySelectorAll(".tasks__li");
    updatedIndex = index;

    if (data[index].tasks.length > 0) {
        for (let i = 1; i < data[index].tasks.length; i++) {
            addInput(inputsContainer);
        }
    }
    taskForm.elements.inputTitle.value = data[index].title;
    taskForm.elements.inputDate.value = data[index].date;
    taskForm.elements.inputColor.value = data[index].color;
    allTasks.forEach((item, index) => {
        taskForm.elements[`inputTask${index + 1}`].value = item.innerText;
        taskForm.elements[`inputTask${index + 1}`].dataset.checked =
            item.dataset.checked;
    });

    deleteList(e);
}
// UPDATE TASK
function autoUpdateTasks(e) {
    const currentList = e.currentTarget.closest(".tasks__art");
    const index = findIndexOfElmt(currentList.id, data);
    const allTasks = currentList.querySelectorAll(".tasks__li");
    if (currentList.querySelector(".tasks__title").innerText)
        data[index].title = sanitizeInput(
            currentList.querySelector(".tasks__title").innerText
        );
    if (currentList.querySelector(".tasks__meta time")) {
        data[index].date = sanitizeInput(
            currentList.querySelector(".tasks__meta time").innerText
        );
    }
    if (currentList.dataset.color) {
        data[index].color = sanitizeInput(currentList.dataset.color);
    }
    if (allTasks.length > 0) {
        data[index].tasks.forEach((item, indexOfTask) => {
            item.task = sanitizeInput(allTasks[indexOfTask].innerText);
            item.isChecked = sanitizeInput(
                allTasks[indexOfTask].dataset.checked
            );
        });
    }
    localStorage.setItem("data", JSON.stringify(data));
    createList();
}

// ANCHOR DELETE LIST
function deleteList(e) {
    const currentList = e.currentTarget.closest(".tasks__art");
    const index = findIndexOfElmt(currentList.id, data);

    // REVIEW
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
}

// ANCHOR ADD INPUT
function addInput(location) {
    const newInput = document.createElement("div");
    newInput.classList.add("my-1", "d-flex");
    newInput.innerHTML = `
    <input type="text" id="inputTask${countInputs}" class="single-task  flex-1 rounded-left" placeholder="Tâche ${countInputs}..." name="task1">
    <button type="button" class="remove-single btn-default rounded-right">-</button>
    `;
    location.appendChild(newInput);
    newInput.querySelector(".remove-single").addEventListener("click", (e) => {
        // noRefresh(e);
        if (countInputs > 2) {
            e.target.parentElement.remove();
            countInputs--;
        } else {
            // Sélectionner le premier enfant de inputsContainer
            e.target.parentElement.children[0].value = "";
        }
    });
    // Ajouter focus sur le dernier input
    newInput.querySelector(".single-task").focus();
    countInputs++;

    return newInput;
}

// ANCHOR CHECK TASK
function checkTask(e) {
    e.currentTarget.dataset.checked =
        e.currentTarget.dataset.checked === "false" ? "true" : "false";
    e.currentTarget.classList.toggle("checked");
    autoUpdateTasks(e);
}

// ANCHOR DELETE TASK
function deleteTask(e) {
    const currentList = e.currentTarget.closest(".tasks__art");
    const indexOfList = findIndexOfElmt(currentList.id, data);
    const indexOfTask = findIndexOfElmt(
        e.currentTarget.innerText,
        data[indexOfList].tasks
    );
    // const indexOfTask = data[indexOfList].tasks.findIndex(
    //     (item) => item.task == e.currentTarget.innerText
    // );
    data[indexOfList].tasks.splice(indexOfTask, 1);
    localStorage.setItem("data", JSON.stringify(data));
    createList();
}

// DISPLAY LISTS ON LOAD
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log("data onLoad", {data});
    createList();
})();

// !SECTION

// ondragstart
// ondragenter
// ondragleave
// ondragend
// ondragover
// ondrop

// const allArticles = document.querySelectorAll(".tasks__art");

// allArticles.forEach((article) => {
//     article.ondragstart = (e) => {
//         console.log("e.target START => ", e.target);
//         e.target.closest("article").classList.add("drag-start");
//         // e.dataTransfer.setData("text/plain", e.target.closest("article").innerHTML);
//         // e.currentTarget.style.transform = "scale(.5)";
//     };
//     article.ondragover = (e) => {
//         e.preventDefault();
//     };

//     article.ondragenter = (e) => {
//         console.log("e.target ENTER => ", e.target.closest("article"));
//         e.target.closest("article").classList.remove("drag-start");
//         // e.target.closest("article").classList.add("drag-enter");
//     };

//     article.ondragleave = (e) => {
//         console.log("e.target LEAVE => ", e.target.closest("article"));
//         // e.target.closest("article").classList.remove("drag-enter");
//     };

//     article.ondrop = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         e.target.closest("article").classList.add("drop");
//         // e.target.closest("article").innerHTML = e.dataTransfer.getData("text/plain");
//     };
//     article.ondragend = (e) => {
//         e.target.closest("article").classList.remove("drop");
//     };
// });

// !SECTION
