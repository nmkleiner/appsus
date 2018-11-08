import noteService from "../services/note-service.js";

import noteList from "./note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import eventBus, { Back_TO_APPSUS,APP_CREATED } from "/mainservices/event-bus.service.js";

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
    eventBus.$emit(APP_CREATED)

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
