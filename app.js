//Define UI var
const form = document.querySelector("#task-form");
const notes = document.querySelector(".list-group");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const noteInput = document.querySelector("#task");

//loading event listeners, calling the function
loadEventListeners();

//load all listeners
function loadEventListeners() {
  //DOM event for Local Storage
  document.addEventListener("DOMContentLoaded", getNotes);

  //add note event
  form.addEventListener("submit", addNotes);
  //remove note event
  notes.addEventListener("click", removeNotes);
  //clear all notes
  clearBtn.addEventListener("click", clearNotes);
  //filter through notes
  filter.addEventListener("keyup", filterNotes);
}

//get notes from LS
function getNotes() {
  let noteList;
  if (localStorage.getItem("noteList") === null) {
    noteList = [];
  } else {
    noteList = JSON.parse(localStorage.getItem("noteList"));
  }
  noteList.forEach(function(nots) {
    //create li el
    const li = document.createElement("li");
    //add class
    li.className = "list-group-item";
    //create a text node and append to it
    li.appendChild(document.createTextNode(nots));
    //create new link el
    const link = document.createElement("a");
    //add class
    link.className = "delete-item float-right text-danger";
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to the li
    li.appendChild(link);
    //append li to ul
    notes.appendChild(li);
  });
}

//add Notes
function addNotes(e) {
  if (noteInput.value === "") {
    alert("Add a Note");
  } else {
    //create li element
    const li = document.createElement("li");
    //console.log(li);
    //add class
    li.className = "list-group-item";
    //create text node and append to it
    li.appendChild(document.createTextNode(noteInput.value));
    //create new link el for removing
    const link = document.createElement("a");
    //add class
    link.className = "delete-item float-right text-danger";
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to the li
    li.appendChild(link);
    //append li to ul
    notes.appendChild(li);

    //store in LS
    storeNoteInLocalStorage(noteInput.value);

    //clear input
    noteInput.value = "";
    e.preventDefault();
  }
}

//store Note
function storeNoteInLocalStorage(note) {
  let noteList;
  if (localStorage.getItem("noteList") === null) {
    noteList = [];
  } else {
    noteList = JSON.parse(localStorage.getItem("noteList"));
  }
  noteList.push(note);

  localStorage.setItem("noteList", JSON.stringify(noteList));
}

//remove note
function removeNotes(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeNoteFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS
function removeNoteFromLocalStorage(noteItem) {
  let noteList;
  if (localStorage.getItem("noteList") === null) {
    noteList = [];
  } else {
    noteList = JSON.parse(localStorage.getItem("noteList"));
  }
  noteList.forEach(function(note, index) {
    if (noteItem.textContent === note) {
      noteList.splice(index, 1);
    }
  });
  localStorage.setItem("noteList", JSON.stringify(noteList));
}

//clear all notes
function clearNotes() {
  while (notes.firstChild) {
    if (confirm("You will loose all notes")) {
      notes.removeChild(notes.firstChild);
    }
  }
  clearNoteFromLocalStorage();
}

//clear notes from ls
function clearNoteFromLocalStorage() {
  localStorage.clear();
}

//filter through the notes
function filterNotes(e) {
  //to get what we type
  const text = e.target.value.toLowerCase();
  //loop through the list, queryselall returns a node list, so we can use foreach
  document.querySelectorAll(".list-group-item").forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
