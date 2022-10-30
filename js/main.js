const modalForm = document.getElementById("modal");
const btnToOPen = document.getElementById("btn-open");
const btnToClose = document.querySelectorAll(".btn-close");
// const inputTitle = document.getElementById("inputTitle");
// const inputDate = document.getElementById("inputDate");
// const textAreaMsg = document.getElementById("textarea_msg");
const taskForm = document.getElementById("task-form").elements;
// console.log('taskForm => ', taskForm);
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");

// PLUGINS SHODOWN MARDOWN
const converter = new showdown.Converter();
converter.setOption('tasklists', 'true');
converter.setOption('tables', 'true');

btnToOPen.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modal.style.display = "block";
  resetForm();
});

btnToClose.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    modal.style.display = "none";
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
    msg.innerHTML = "Task cannot be blank";
    msg.classList.add("color-danger");
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    modal.style.display = "none";
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
  });
  

  localStorage.setItem("data", JSON.stringify(data));

  console.log({data});
  createTasks();
};

// ANCHOR CREATE TASK

const createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <article id=${y} class="tasks__art d-flex fd-column">
      <h3 class="tasks__title">${x.title}</h3>
      <p class="tasks__meta">${x.date}</p>
      <pre class="tasks__description">${converter.makeHtml(x.description)}</pre>
      <form class="text-right mt-auto">
        <button class="btn-square" onClick="editTask(this)">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-square" onClick="deleteTask(this);createTasks()">
          <i class="fas fa-trash-alt"></i>
        </button>
      </form>
      </article>
      `);
  });

  resetForm();
};

// ANCHOR UPDATE DATA

const editTask = (e) => {
  modal.style.display = "block";
  let selectedTask = e.parentElement.parentElement;
  console.log("selectedTask.id => ", selectedTask.id);

  taskForm.inputTitle.value = data[selectedTask.id].title;
  taskForm.inputDate.value = data[selectedTask.id].date;
  taskForm.textAreaMsg.value = data[selectedTask.id].description;

  deleteTask(e);
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
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log({data});
  createTasks();
})();
