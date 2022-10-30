const modalForm = document.querySelector("#modalForm");
const btnToOPen = document.querySelector("#btn-create");
const btnToClose = document.querySelectorAll(".btn-close");
const btnToAdd = document.querySelector("#btn-add");
const taskForm = document.querySelector("#task-form").elements;
const info = document.querySelector("#info");
const tasks = document.querySelector("#tasks");
const initInfo = "Pour créer une tâche appuyer sur +"

// PLUGINS SHODOWN MARDOWN
const converter = new showdown.Converter();
converter.setOption("tasklists", "true");
converter.setOption("tables", "true");
// END

btnToOPen.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modalForm.style.display = "block";
  // resetForm();
});

btnToClose.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalForm.style.display = "none";
  });
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  formValidation();
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

// ANCHOR ACCEPT DATA
let data = [];
const acceptData = () => {
  // data.push({object})
  data.unshift({
    title: taskForm.inputTitle.value,
    date: taskForm.inputDate.value,
    description: taskForm.textAreaMsg.value,
    color: taskForm.inputColor.value
  });
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

// ANCHOR CREATE TASK
const createTasks = () => {
  tasks.innerHTML = "";
  btnToAdd.innerHTML= "Add";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <article id=${y} class="tasks__art d-flex fd-column" style="border-color:${x.color}">
      <h3 class="tasks__title">${x.title}</h3>
      <p class="tasks__meta">${x.date}</p>
      <pre class="tasks__description">${converter.makeHtml(x.description)}</pre>
      <form class="text-right mt-auto">
        <button class="btn-square" onClick="editTask(this)">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-square" onClick="deleteTask(this);">
          <i class="fas fa-trash-alt"></i>
        </button>
      </form>
      </article>
      `);
  });
  resetForm();
  
  console.log({data});
};

// ANCHOR UPDATE DATA
const editTask = (e) => {
  modalForm.style.display = "block";
  btnToAdd.innerHTML= "Update";
  let selectedTask = e.parentElement.parentElement;
  taskForm.inputTitle.value = data[selectedTask.id].title;
  taskForm.inputDate.value = data[selectedTask.id].date;
  taskForm.textAreaMsg.value = data[selectedTask.id].description;
  taskForm.inputColor.value = data[selectedTask.id].color;
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
let resetForm = () => {
  taskForm.inputTitle.value = "";
  taskForm.inputDate.value = "";
  taskForm.textAreaMsg.value = "";
  taskForm.inputColor.value = "#ffd700";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log({data});
  createTasks();
})();
