import noteService from "../services/note-service.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteTodosEdit from "../cmps/note-todos.edit.cmp.js";
import busService, {
  USR_MSG_DISPLAY
} from "../../mainservices/event-bus.service.js";

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
        <form class="flex flex-column">
            <textarea v-model="note.text" ref="text" :rows="rows" cols="50" />
            <note-img v-if="note.image" :img="note.image"></note-img>
            <note-todos-edit v-if="note.todos" :todos="note.todos"
                @delete-todo="deleteTodo" @move-todo="moveTodo"></note-todos-edit>
            <div class="edit-icons flex space-around">
              <div class="input-container">
                <i class="fas fa-fill input-el" title="background color"></i>
                <input class="input-el" type="color">
              </div>
              <div class="input-container">
                <i class="fas fa-font input-el" title="font"></i>
                <input class="input-el" type="font">
              </div>
              <div class="input-container">
                <i class="fas fa-palette input-el" title="font color"></i>
                <input class="input-el" type="color">
              </div>
              <i class="fas fa-sort" title="font size"></i>
              <i class="fas fa-list-ol" title="add a todo list"></i>
              <i class="far fa-images" title="add a picture" @click="getImage"></i>
              <i class="fas fa-align-left" title="align left"></i>
              <i class="fas fa-align-right" title="align right"></i>
              <!-- <i class="far fa-file-audio"></i> -->
              <i class="fas fa-save" @click="saveNote" title="save note"></i>
            </div>
            <input v-if="isGetImg" v-model.lazy="note.image" type="text" ref="img" placeholder="Paste your picture url">
        </form>
    </section>
    `,
  computed: {
    rows() {
      if (this.note.image || this.note.todos
        && this.note.todos. length > 0) return 1;
      return 10;
    }
  },
  data() {
    return {
      isGetImg: false,
      note: { text: "" }
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
        busService.$emit(USR_MSG_DISPLAY, {
          txt: "The note has been saved",
          type: "success"
        });
        this.$router.push("/note");
      });
    },
    getImage() {
      this.isGetImg = true;
      // this.$refs.img.focus();
    },
    deleteTodo(todoIdx) {
      // const noteIdx = noteService.getById(this.$route.params.noteId);
      noteService.deleteTodo(this.note.id, todoIdx)
      .then(note => {
        this.note = note;
      });
    },
    moveTodo(todoIdx, whereTo) {
      noteService.deleteTodo(this.note.id, todoIdx, whereTo)
      .then(note => {
        this.note = note;
      });
    }
  },
  mounted() {
    this.$refs.text.focus();
  },
  components: {
    noteImg,
    noteTodosEdit
  }
};
