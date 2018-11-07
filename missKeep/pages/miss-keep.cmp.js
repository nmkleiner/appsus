import noteService from '../services/note-service.js'

import noteList from './note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

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
            noteService.query(filter)
            .then(notes => this.notes = notes)
        }
    },
    
    components: {
        noteList,
        noteFilter
    }
}

