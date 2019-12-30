class ToDoList {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

class UI {
  static displayToDoList() {
    var lists = Storage.getList();
    lists.forEach(list => UI.addToDoList(list));
  }
  static addToDoList(list) {
    var todolist = document.getElementById("todo-list");
    var tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${list.title}</td>
          <td>${list.description}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
          `;

    todolist.appendChild(tr);
  }

  static clearInput() {
    const title = (document.getElementById("title").value = "");
    const description = (document.getElementById("description").value = "");
  }

  static deleteList(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
  }

  static dangerAlert() {
    var alert = document.querySelector(".showAlert");
    var p = document.createElement("p");
    p.className = "btn btn-danger btn-lg btn-sm btn-block";
    p.innerHTML = `
     All fields are required
    `;

    alert.appendChild(p);

    setTimeout(() => document.querySelector(".btn-danger").remove(), 3000);
  }

  static successAlert() {
    var alert = document.querySelector(".showAlert");
    var p = document.createElement("p");
    p.className = "btn btn-success btn-lg btn-sm btn-block";
    p.innerHTML = `
     List is added
    `;

    alert.appendChild(p);

    setTimeout(() => document.querySelector(".btn-success").remove(), 3000);
  }
}

class Storage {
  static saveList(list) {
    localStorage.setItem("list", JSON.stringify(list));
  }
  static getList() {
    let lists;
    if (localStorage.getItem("lists") === null) {
      lists = [];
    } else {
      lists = JSON.parse(localStorage.getItem("lists"));
    }

    return lists;
  }

  static addLists(list) {
    const lists = Storage.getList();
    lists.push(list);
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  static removeList(description) {
    const lists = Storage.getList();

    lists.forEach((list, index) => {
      if (list.description === description) {
        lists.splice(index, 1);
      }
    });

    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayToDoList);

document.querySelector("#todo-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const list = new ToDoList(title, description);

  if (title == "" || description == "") {
    UI.dangerAlert();
  } else {
    UI.addToDoList(list);

    Storage.addLists(list);

    UI.clearInput();

    UI.successAlert();
  }
});

document.querySelector("#todo-form").addEventListener("click", e => {
  UI.deleteList(e.target);

  Storage.removeList(e.target.parentElement.previousElementSibling.textContent);
});
