import {getRandomColor} from "./color.js";
import {sanitizeInput, noRefresh, findIndexOfElmt} from "./utilities.js";
import {getDemo} from "./demo.js";
// import {noRefresh} from "./tools.js";

const modalForm = document.querySelector("#modal-form");
const listsForm = document.querySelector("#list-form");
const btnCreate = document.querySelector("#btn-create");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const btnDemo = document.querySelector("#btn-demo");
const listsContainer = document.querySelector("#lists-container");
const inputsContainer = document.querySelector("#inputs-container");
let data = [];
let countInputs = 0;
let updatedIndex = "";
const info = document.querySelector("#info");

// SECTION TODO APP

// ANCHOR HANDLE APP UI

btnCreate.addEventListener("click", (e) => {
    noRefresh(e);
    createList();
    modalForm.style.display = "block";
    listsForm.classList.add("fx-scale-out");
    listsForm.inputTitle.focus();
    listsForm.inputColor.value = getRandomColor(50, 50);
});

btnDeleteAll.addEventListener("click", (e) => {
    noRefresh(e);
    if (
        window.confirm(
            "Voulez-vous vraiment tout supprimer ? Vous allez perdre vos données"
        )
    ) {
        localStorage.clear();
        data = [];
        createList();
    }
});

btnDemo.addEventListener("click", (e) => {
    if (
        window.confirm(
            "Attention ! Vous allez perdre vos données actuelles. Voulez-vous continuer ?"
        )
    ) {
        getDemo();
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
    for (let i = 0; i < listsForm.elements.length; i++) {
        if (listsForm.elements[i].name) {
            // REVIEW
            if (!listsForm.elements[i].classList.contains("single-task")) {
                obj[listsForm.elements[i].name] = sanitizeInput(
                    listsForm.elements[i].value
                );
            } else if (listsForm.elements[i].value) {
                // obj["tasks"].push(sanitizeInput(listsForm.elements[i].value));
                obj.tasks.push({
                    isChecked:
                        listsForm.elements[i].dataset.checked === "true"
                            ? "true"
                            : "false",
                    task: sanitizeInput(listsForm.elements[i].value),
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

// ANCHOR CREATE LIST | LOOP
function createList() {
    listsContainer.innerHTML = "";
    document.querySelector("#btn-validation").innerHTML = "Ajouter";
    data.map((x) => {
        return (listsContainer.innerHTML += `
      <article id=${x.id} class="list d-flex fd-column" style="border-color:${
            x.color
        }"  data-color="${x.color}">
        <header class="list__header">
            <h3 class="list__title">${x.title}</h3>
        </header>
        ${
            x.date
                ? `<p class="list__meta p-1"><small>Échéance: <time>${x.date}</time></small></p>`
                : ""
        }
      <ul class="list__tasks">
        ${x.tasks
            .map((y) => {
                return `<li class="list__li ${
                    y.isChecked === "true" ? "checked" : ""
                }" data-checked="${
                    y.isChecked === "true" ? "true" : "false"
                }">${y.task}</li>`;
            })
            .join("")}
      </ul>
      <form class="text-right mt-auto">
        <button class="edit-list btn-square" >
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-list btn-square" >
          <i class="fas fa-trash-alt"></i>
        </button>
      </form>
      </article>
      `);
    });

    // ANCHOR HANDLE LISTS UI

    const edit = listsContainer.querySelectorAll(".edit-list");
    edit.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            updateList(e);
        });
    });

    const resetBtn = listsContainer.querySelectorAll(".delete-list");
    resetBtn.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            deleteList(e);
            createList();
        });
    });

    const tasksLi = listsContainer.querySelectorAll(".list__li");
    tasksLi.forEach((item) => {
        item.addEventListener("click", (e) => {
            noRefresh(e);
            checkTask(e);
        });
        item.addEventListener("dblclick", (e) => {
            noRefresh(e);
            deleteTask(e);
        });
    });

    // ANCHOR DRAG AND DROP
    // console.log("listsContainer => ", listsContainer);
    listsContainer.querySelectorAll("article").forEach((article) => {
        article.setAttribute("draggable", "true");
        article.addEventListener("dragstart", handleDragStart);
        article.addEventListener("dragover", handleDragOver);
        article.addEventListener("dragenter", handleDragEnter);
        article.addEventListener("dragleave", handleDragLeave);
        article.addEventListener("drop", handleDrop);
        article.addEventListener("dragend", handleDragEnd);
    });

    listsForm.reset();
    inputsContainer.innerHTML = "";
    countInputs = 1;
    addInput(inputsContainer);
    console.log("data created", data);
}

// ANCHOR UPDATE LIST
function updateList(e) {
    modalForm.style.display = "block";
    listsForm.classList.add("fx-scale-out");
    document.querySelector("#btn-validation").innerHTML = "Mettre à jour";
    const currentList = e.currentTarget.closest(".list");
    const index = findIndexOfElmt(currentList.id, data);
    const allTasks = currentList.querySelectorAll(".list__li");
    updatedIndex = index;

    if (data[index].tasks.length > 0) {
        for (let i = 1; i < data[index].tasks.length; i++) {
            addInput(inputsContainer);
        }
    }
    listsForm.elements.inputTitle.value = data[index].title;
    listsForm.elements.inputDate.value = data[index].date;
    listsForm.elements.inputColor.value = data[index].color;
    allTasks.forEach((item, index) => {
        listsForm.elements[`inputTask${index + 1}`].value = item.innerText;
        listsForm.elements[`inputTask${index + 1}`].dataset.checked =
            item.dataset.checked;
    });

    deleteList(e);
}
// UPDATE TASK
function autoUpdateTasks(e) {
    const currentList = e.currentTarget.closest(".list");
    const index = findIndexOfElmt(currentList.id, data);
    const allTasks = currentList.querySelectorAll(".list__li");
    if (currentList.querySelector(".list__title").innerText)
        data[index].title = sanitizeInput(
            currentList.querySelector(".list__title").innerText
        );
    if (currentList.querySelector(".list__meta time")) {
        data[index].date = sanitizeInput(
            currentList.querySelector(".list__meta time").innerText
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
    const currentList = e.currentTarget.closest(".list");
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
    const currentList = e.currentTarget.closest(".list");
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
    console.log("data onLoad", data);
    createList();
})();

// !SECTION

// SECTION DRAG AND DROP

// ondragstart
// ondragenter
// ondragleave
// ondragend
// ondragover
// ondrop

// const allArticles = document.querySelectorAll(".list");

let dragSource = null;

function handleDragStart(e) {
    dragSource = e.target.closest(".list");
    console.log("dragSource => ", dragSource);
    this.classList.add("drag-start");
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add("drag-enter");
}

function handleDragEnter(e) {
    this.classList.add("drag-enter");
}

function handleDragLeave(e) {
    this.classList.remove("drag-enter");
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove("drop");
    const dropTarget = e.target.closest(".list");
    const targetIndex = findIndexOfElmt(dropTarget.id, data);
    console.log("targetIndex => ", targetIndex);
    const sourceIndex = findIndexOfElmt(dragSource.id, data);
    console.log("sourceIndex => ", sourceIndex);
    if (targetIndex !== sourceIndex) {
        const [removed] = data.splice(sourceIndex, 1);
        data.splice(targetIndex, 0, removed);
        localStorage.setItem("data", JSON.stringify(data));
        createList();
    }
}

function handleDragEnd(e) {
    this.classList.remove("drag-start");
}

// !SECTION
