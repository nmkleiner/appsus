import noteService from "../../missKeep/services/note-service.js";
import eventBus, { Back_TO_APPSUS } from "/mainservices/event-bus.service.js";

import noteList from "../../missKeep/cmps/note-list.js";
import noteFilter from "../../missKeep/cmps/note-filter.js";

export default {
  template: `
        <section class="note">
            <h1>Miss Keep</h1>



            <header>
          <router-link to="/">
            <div class="btn btn-sm btn-dark" @click="backToAppsus">
              <i class="fas fa-arrow-circle-left"></i>
            </div>
          </router-link>
        </header>



            <router-link to="/note/edit">New Note</router-link> 
            <note-filter @filtered="setFilter"></note-filter>
            <note-list :notes="notes"></note-list>
        </section>
    `,
  data() {
    return {
      notes: []
    };
  },
  created() {
    noteService.query().then(notes => (this.notes = notes));
  },
  methods: {
    setFilter(filter) {
      noteService.query(filter).then(notes => (this.notes = notes));
    },
    backToAppsus() {
      eventBus.$emit(Back_TO_APPSUS);
    }
  },

  components: {
    noteList,
    noteFilter
  }
};
