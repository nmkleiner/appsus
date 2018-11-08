import noteService from "../services/note-service.js";

export default {
  props: ["notes"],
  template: `
        <section class="note-list flex flex-wrap">
            <div v-for="note in notes">
                    <div class="note-container" @click="editNote(note.id)">
                        <i class=" delete-btn far fa-trash-alt" @click.stop="deleteNote(note.id)"></i>
                        {{note.text}}
                    </div>
                    <div class="flex space-around">
                    <!-- <button @click="deleteNote(note.id)">Delete</button> -->
                        <!-- <router-link :to="'/note/'+note.id">Delete</router-link>
                        <router-link :to="'/note/edit/'+note.id">Edit</router-link> -->
                    </div>
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
    }
  }
}
