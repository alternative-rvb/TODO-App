let modalForm = document.getElementById("modal");
let btnToOPen = document.getElementById("btn-open");
let btnToClose = document.querySelectorAll(".btn-close");

let inputTitle = document.getElementById("input-title");
let inputDate = document.getElementById("input-date");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
// let btnToOpen = document.getElementById("add");

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

let formValidation = () => {
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

let acceptData = () => {
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

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <article id=${y} class="tasks__art d-flex fd-column">
      <h3>${x.text}</h3>
      <p>${x.date}</p>
      <p>${x.description}</p>
      <form class="text-right">
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

let editTask = (e) => {
  modal.style.display = "block";
  let selectedTask = e.parentElement.parentElement;

  inputTitle.value = selectedTask.children[0].innerHTML;
  inputDate.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

// ANCHOR DELETE TASK

let deleteTask = (e) => {
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

// ANCHOR MODAL

// When the user clicks on the button, open the modal
// btnToOpen.onclick = function () {
//   modal.style.display = "block";
// };

// When the user clicks on <span> (x), close the modal
// btnToClose.onclick = function () {
//   modal.style.display = "none";
// };

// FIXME When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modalForm) {
//     modal.style.display = "none";
//   }
// };
