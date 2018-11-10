import noteService from "../services/note-service.js";

import noteList from "./note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import eventBus, { Back_TO_APPSUS,APP_CREATED } from "../../mainservices/event-bus.service.js";

export default {
  template: `
        <section class="note">
            <h1>Miss Keep</h1>

            <header>
              <div class="btns-container">
                <router-link   to="/">
                  <div class="btn btn-sm btn-dark" @click="backToAppsus">
                    <i class="fas fa-arrow-circle-left"></i>
                  </div>
                </router-link>
                <router-link   to="/email">
                  <div class="btn btn-sm btn-dark" @click="backToAppsus">
                    Go To Email
                  </div>
                </router-link>
              </div>  
            </header>
            <div class="note-controls-conatiner flex">
              <note-filter @filtered="setFilter"></note-filter>
              <router-link to="/note/edit">
                <button class="btn btn-mm btn-dark">New Note</button>
              </router-link> 
            </div>
            <div class="notes-list">
              <note-list :notes="notes" 
              @note-deleted="noteDeleted" 
              @note-pinned="notePinned"></note-list>
            </div>
        </section>
    `,
  data() {
    return {
      notes: []
    };
  },
  created() {
    eventBus.$emit(APP_CREATED)

    noteService.query().then(notes => (this.notes = notes));
  },
  methods: {
    setFilter(filter) {
      noteService.query(filter).then(notes => (this.notes = notes));
    },
    backToAppsus() {
      eventBus.$emit(Back_TO_APPSUS);
    },
    noteDeleted(noteId) {
      noteService.deleteNote(noteId).then((res) => {
        this.notes = res;
      });
    },
    notePinned(note) {
      noteService.moveNoteToTop(note).then((res) => {
        this.notes = res;
      });
    }
  },

  components: {
    noteList,
    noteFilter
  }
};
