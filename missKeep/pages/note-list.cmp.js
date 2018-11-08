import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteService from '../services/note-service.js'


export default {
  props: ["notes"],
  template: `
        <section>
            <div v-for="note in notes" class="note-container"
                @click="editNote(note.id)">
                        <i class="pin-to-top fas fa-thumbtack" title="pin to top"  @click.stop="pinToTop(note)"></i>
                        <i class=" delete-btn far fa-trash-alt" @click.stop="deleteNote(note.id)"></i>
                        {{note.text}}
                        <note-img :img="note.image"></note-img>
                        <note-todos :todos="note.todos"></note-todos>
            </div>
        
        </section>
    `,
  methods: {
    editNote(noteId) {
      this.$router.push(`/note/edit/${noteId}`);
    },
    deleteNote(noteId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.$emit('note-deleted', noteId)
            
            }
          })
    },
    pinToTop(note) {
        this.$emit('note-pinned',note);
    }
  },
  components: {
      noteImg,
      noteTodos
  }
}
