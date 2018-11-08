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
        <form  class="flex flex-column">
            <textarea v-model="note.text" ref="text" rows="10" cols="50" />
            <div class="edit-icons flex space-around">
            <i class="fas fa-thumbtack" title="pin to top"></i>
              <i class="fas fa-fill" title="background color"></i>
              <i class="fas fa-font" title="font"></i>
              <i class="fas fa-palette" title="font color"></i>
              <i class="fas fa-sort" title="font size"></i>
              <i class="fas fa-list-ol" title="add a todo list"></i>
              <i class="far fa-images" title="add a picture"></i>
              <i class="fas fa-align-left" title="align left"></i>
              <i class="fas fa-align-right" title="align right"></i>
              <!-- <i class="far fa-file-audio"></i> -->
              <i class="fas fa-save" @click="saveNote" title="save note"></i>
            </div>
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
  },
  mounted() {
    this.$refs.text.focus();
  }
};
