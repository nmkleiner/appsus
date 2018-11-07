export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes">
                    {{note}}
                    <router-link :to="'/note/'+note.id">Details</router-link> |
                    <router-link :to="'/note/edit/'+note.id">Edit</router-link>
                </li>
            </ul>
            
        </section>
    `,
    data() {
        return {
        }
    },
   
}