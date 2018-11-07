import noteService from '../services/note-service.js'
import busService, {USR_MSG_DISPLAY} from '../../mainservices/event-bus.service.js'


export default {
  template: `
    <section class="note-edit">
        <header>
            <router-link to="/note">
                <div class="btn btn-sm btn-dark">
                    <i class="fas fa-arrow-circle-left"></i>
                </div>
            </router-link>
        </header>
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote">
            <textarea v-model="note.text" rows="10" cols="50" />
            <button type="submit">{{(note.id)? 'Save': 'Add'}}</button>
        </form>
    </section>
    `,
  data() {
    return {
      note: { text: '' }
    };
  },
  created() {
    const noteId = this.$route.params.noteId;
    if (noteId) {
      noteService.getById(noteId).then(note => {
        this.note = note;
      });
    }
  },
  methods: {
    saveNote() {
      console.log(this.note);
      noteService.saveNote(this.note).then(() => {
        console.log("Saved!");
        busService.$emit(USR_MSG_DISPLAY, {txt: 'The note has been saved', type:'success' })
        this.$router.push("/note");
      });
    }
  }
};
