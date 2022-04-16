const modalForm = document.getElementById("modal");
const btnToOPen = document.getElementById("btn-open");
const btnToClose = document.querySelectorAll(".btn-close");
const inputTitle = document.getElementById("input-title");
const inputDate = document.getElementById("input-date");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");

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
    text: inputTitle.value,
    date: inputDate.value,
    description: textarea.value,
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
      <h3 class="tasks__title">${x.text}</h3>
      <p class="tasks__meta">${x.date ?  '<i class="fa-solid fa-clock"></i> ' + x.date: ''}</p>
      <p><pre class="tasks__description">${x.description}</pre></p>
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

  inputTitle.value = selectedTask.children[0].innerHTML;
  inputDate.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

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
  inputTitle.value = "";
  inputDate.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log({data});
  createTasks();
})();
