import storageService from '../../mainservices/storage.service.js'
import utilService from '../../mainservices/util.service.js'

export default {
    query,
    getById,
    deleteNote,
    saveNote,
    moveNoteToTop,
    deleteTodo,
    moveTodo,
    addTodo
}

const KEY = 'notesAppKey';

function query(filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = createInitialNotes();
                storageService.store(KEY, notes);
            }
            if (filter === null) return notes;
            else return notes.filter(note => 
                note.text.toUpperCase().includes(filter.byWord.toUpperCase()));
        })
} 

function getById(noteId) {
    return storageService.load(KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        })
}

function deleteNote(noteId) {
    return storageService.load(KEY)
        .then(notes => {
            var noteIdx = notes.findIndex(note => note.id === noteId);
            notes.splice(noteIdx, 1);
            storageService.store(KEY, notes);
            return notes
        })
}

function saveNote(note) {
    return storageService.load(KEY)
        .then(notes => {
            // Update
            if (note.id) {
                var noteIdx = notes.findIndex(currNote => currNote.id === note.id)
                notes.splice(noteIdx, 1, note);
            } else {
                // Add
                note.id = utilService.makeId();
                notes.push(note);
            }
            return storageService.store(KEY, notes);
        });
}

function createInitialNotes() {
    let notes = [];
    for (var i=0; i<10; i++){
        notes.push({
            id: utilService.makeId(),
            text: utilService.makeLorem(10),
            type: 'text',
            image: '',
            todos: [],
            isTodos: false,
            audio: '',
            style: {
                backgroundColor: '', 
                fontFamily: '', 
                color: '', 
                fontSize: '', 
                textAlign: ''}
        })
    }
    notes[0].image = "../../../img/test.jpg";
    notes[1].todos = ['call Muki', 'Email someone', 'Go home!'];
    return notes;
}

function moveNoteToTop(currNote) {
    return storageService.load(KEY)
    .then(notes => {
        var noteIdx = notes.findIndex(note => note.id === currNote.id);
        notes.splice(noteIdx,1);
        notes.splice(0,0,currNote);
        // notes.unshift(currNote);
        storageService.store(KEY, notes);
        return notes
    })
}

function deleteTodo (noteId, todoIdx) {
    return getById(noteId)
        .then(note => {
            note.todos.splice(todoIdx, 1)
            return saveNote(note).then(() => note)
        })
}

function moveTodo (noteId, todoIdx, whereTo) {
    return getById(noteId)
        .then(note => {
            var currTodo = note.todos[todoIdx];
            if (whereTo==='up') {
                note.todos.splice(todoIdx-1, 0, currTodo)
                note.todos.splice(todoIdx+1, 1)
            }
            else {
                note.todos.splice(todoIdx+2, 0, currTodo)
                note.todos.splice(todoIdx, 1)
            }
            return saveNote(note).then(() => note)
        })
}

function addTodo(newTodo,noteId) {
    return getById(noteId)
    .then(note => {
        note.todos.push(newTodo)
        return saveNote(note).then(() => note);
    })
}