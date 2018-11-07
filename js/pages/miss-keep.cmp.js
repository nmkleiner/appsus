import noteService from '../../missKeep/services/note-service.js'

import noteList from '../../missKeep/cmps/'
import noteFilter from '../../missKeep/cmps'

export default {
    template: `
        <section class="note">
            <h1>Miss Keep</h1>
            <router-link to="/note/edit">New Note</router-link> 
            <note-filter @filtered="setFilter"></note-filter>
            <note-list :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
        setFilter(filter) {
            noteService.query.(filter)
            .then(notes => this.notes = notes)
        }
    },
    
    components: {
        noteList,
        noteFilter
    }
}

