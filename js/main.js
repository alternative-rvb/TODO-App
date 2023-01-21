import {getRandomColor} from "./color.js";

const modalForm = document.querySelector("#modalForm");
const btnToOPen = document.querySelector("#btn-create");
const btnToClose = document.querySelectorAll(".btn-close");
const btnToAdd = document.querySelector("#btn-add");
const btnToDelete = document.querySelector("#btn-delete");
const taskForm = document.querySelector("#task-form");
console.log("taskForm => ", taskForm);
const info = document.querySelector("#info");
const tasks = document.querySelector("#tasks");
const initInfo = "Pour créer une tâche appuyer sur +";

// SECTION PLUGINS SHODOWN MARDOWN
// const converter = new showdown.Converter();
// converter.setOption("tasklists", "true");
// converter.setOption("tables", "true");
// !SECTION

// SECTION TODO APP

const noRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

btnToOPen.addEventListener("click", (e) => {
    noRefresh(e);
    modalForm.style.display = "block";
    // resetForm();
});

btnToClose.forEach((item) => {
    item.addEventListener("click", (e) => {
        noRefresh(e);
        modalForm.style.display = "none";
    });
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
        // FIXME
        // btn-add.setAttribute("data-bs-dismiss", "modal");
        // btn-add.click();
        // (() => {
        //   btn-add.setAttribute("data-bs-dismiss", "");
        // })();
    }
};

modalForm.addEventListener("submit", (e) => {
    noRefresh(e);
    formValidation();
});

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
            } else {
                obj["task"].push(taskForm.elements[i].value);
            }
        }
    }
    console.log("obj => ", obj);

    data.unshift({
        ...obj,
    });

    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

// ANCHOR CREATE TASK | AFFICHAGE
const createTasks = () => {
    tasks.innerHTML = "";
    btnToAdd.innerHTML = "Add";
    data.map((x, y) => {
        return (tasks.innerHTML += `
      <article id=${y} class="tasks__art d-flex fd-column" style="border-color:${
            x.color
        }">
      <h3 class="tasks__title">${x.title}</h3>
      <p class="tasks__meta">${x.date}</p>
      <ul>
        ${x.task.map((item) => `<li class="tasks__task">${item}</li>`).join("")}
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

    btnToDelete.addEventListener("click", (e) => {
        console.log("e => ", e);
        noRefresh(e);
        resetForm();
        modalForm.style.display = "none";
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
        });
    });
    resetForm();

    console.log("data when create", {data});
};

// ANCHOR UPDATE DATA
const editTask = (e) => {
    modalForm.style.display = "block";
    btnToAdd.innerHTML = "Update";
    let selectedTask = e.parentElement.parentElement;
    taskForm.elements.inputTitle.value = data[selectedTask.id].title;
    taskForm.elements.inputDate.value = data[selectedTask.id].date;
    taskForm.elements.inputTask1.value = data[selectedTask.id].task1;
    taskForm.elements.inputColor.value = data[selectedTask.id].color;
    deleteTask(e);
    console.log({data});
};

// ANCHOR DELETE TASK
const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log({data});
};

// ANCHOR RESET FORM
const resetForm = () => {
    taskForm.elements.inputTitle.value = "";
    taskForm.elements.inputDate.value = "";
    taskForm.elements.inputTask1.value = "";
    taskForm.elements.inputColor.value = getRandomColor(50, 50);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log("data at first time", {data});
    createTasks();
})();

// !SECTION
