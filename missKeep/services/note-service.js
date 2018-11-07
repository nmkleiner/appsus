'use strict'

import strorageService from '../../mainservices/storage.service'
import utilService from '../../mainservices/util.service'

const KEY = 'notesAppKey';

function query(filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = createInitialNotes();
                storageService.store(KEY, notes);
            }
            console.log('Notes: ', notes);
            if (filter === null) return notes;
            else return notes.filter(note => 
                            note.vendor.toUpperCase().includes(filter.byTitle.toUpperCase()))
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
            return storageService.store(KEY, notes);
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

export default {
    query,
    getById,
    deleteNote,
    saveNote
}

function createInitialNotes() {
    let notes = [];
    for (var i=0; i<10; i++){
        notes.push({
            noteId: utilService.makeId(),
            noteTxt: utilService.makeLorem(10) 
        })
    }
    return notes;
}

