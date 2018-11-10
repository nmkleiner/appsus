import storageService from "../../mainservices/storage.service.js";
import utilService from "../../mainservices/util.service.js";

export default {
  query,
  getById,
  deleteNote,
  saveNote,
  moveNoteToTop,
  deleteTodo,
  moveTodo,
  addTodo
};

const KEY = "notesAppKey";

function query(filter = null) {
  return storageService.load(KEY).then(notes => {
    if (!notes || !notes.length) {
      notes = createInitialNotes();
      storageService.store(KEY, notes);
    }
    if (filter === null) return notes;
    else
      return notes.filter(note =>
        note.text.toUpperCase().includes(filter.byWord.toUpperCase())
      );
  });
}

function getById(noteId) {
  return storageService.load(KEY).then(notes => {
    return notes.find(note => note.id === noteId);
  });
}

function deleteNote(noteId) {
  return storageService.load(KEY).then(notes => {
    var noteIdx = notes.findIndex(note => note.id === noteId);
    notes.splice(noteIdx, 1);
    storageService.store(KEY, notes);
    return notes;
  });
}

function saveNote(note) {
  return storageService.load(KEY).then(notes => {
    // Update
    var noteIdx;
    if (note.id) {
      noteIdx = notes.findIndex(currNote => currNote.id === note.id);
      if (noteIdx === -1) {
        notes.push(note);
        noteIdx = notes.length - 1;
      } else {
        notes.splice(noteIdx, 1, note);
      }
    } else {
      // Add
      note.id = utilService.makeId();
      notes.push(note);
      noteIdx = notes.length - 1;
    }
    storageService.store(KEY, notes).then(() => {
      return notes[noteIdx];
    });
    return notes[noteIdx];
  });
}

function createInitialNotes() {
  let notes = [];
  for (var i = 0; i < 10; i++) {
    notes.push({
      id: utilService.makeId(),
      text: utilService.makeLorem(10),
      image: "",
      todos: [],
      audio: "",
      style: {
        backgroundColor: "",
        fontFamily: "",
        color: "",
        fontSize: "",
        textAlign: ""
      }
    });
  }
  notes[0].image = "../../../img/test.jpg";
  notes[1].todos = ["call Muki", "Email someone", "Go home!"];
  return notes;
}

function moveNoteToTop(currNote) {
  return storageService.load(KEY).then(notes => {
    var noteIdx = notes.findIndex(note => note.id === currNote.id);
    notes.splice(noteIdx, 1);
    notes.splice(0, 0, currNote);
    storageService.store(KEY, notes);
    return notes;
  });
}

function deleteTodo(noteId, todoIdx) {
  return getById(noteId).then(note => {
    note.todos.splice(todoIdx, 1);
    return saveNote(note).then(() => note);
  });
}

function moveTodo(noteId, todoIdx, whereTo) {
  return getById(noteId).then(note => {
    var currTodo = note.todos[todoIdx];
    if (whereTo === "up") {
      note.todos.splice(todoIdx - 1, 0, currTodo);
      note.todos.splice(todoIdx + 1, 1);
    } else {
      note.todos.splice(todoIdx + 2, 0, currTodo);
      note.todos.splice(todoIdx, 1);
    }
    return saveNote(note).then(() => note);
  });
}

function addTodo(newTodo, note) {
  if (!note.id) {
    note.id = utilService.makeId();
    if (!note.text) note.text = "Todo List";
    note.todos = [];
  }
  note.todos.push(newTodo);
  return note;
}
