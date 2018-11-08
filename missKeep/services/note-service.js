import storageService from '../../mainservices/storage.service.js'
import utilService from '../../mainservices/util.service.js'

export default {
    query,
    getById,
    deleteNote,
    saveNote
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
            console.log('storageService.store(KEY, notes)',storageService.store(KEY, notes)); 
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
            todo: [],
            audio: '',
            prefs: {backColor: '', fontColor: '', font: '', fontSize: '', align: ''}
        })
    }
    return notes;
}

