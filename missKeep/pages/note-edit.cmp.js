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
        </div>
        <form class="flex flex-column">
            <textarea v-model="note.text" ref="text" :rows="rows" cols="50" :style="styleObject"/>

            <note-img v-if="note.image" :img="note.image"></note-img>
            
            <note-todos-edit v-if="isTodos" :todos="note.todos" :style="styleObject"
                @delete-todo="deleteTodo" @move-todo="moveTodo"></note-todos-edit>
            
            <div class="edit-icons flex space-around">
              <div class="input-container">
                <i class="fas fa-fill input-el"></i>
                <input class="input-el" type="color" title="background color" 
                  v-model="styleObject.backgroundColor">
              </div>

              <i class="fas fa-font" title="font"></i>
              
              <div class="input-container">
                <i class="fas fa-palette input-el"></i>
                <input class="input-el" type="color" title="font color" v-model="styleObject.color">
              </div>
              
              <i class="fas fa-sort" title="font size"></i>
              
              <i class="far fa-images" title="add a picture" @click="getImage"></i>
              
              <i class="fas fa-align-center" title="text align"></i>
              
              <i class="fas fa-check" @click="saveNote" title="save note"></i>
            </div>

            <input v-model.lazy.trim="newTodo" @keyup.enter="addTodo(newTodo, note)" 
            ref="newTodo" type="text" placeholder="Type a new Todo and press ENTER">
            <div v-if="isGetImg">
              <input  v-model.lazy="note.image" @keyup.enter="" type="text" 
              ref="img" placeholder="Paste your picture url">
              <input type="file" @change="uploadFile($event)" value="myPic.jpg">
            </div>
        </form>
    </section>
    `,
  computed: {
    rows() {
      if (this.note.image || (this.note.todos && this.note.todos.length > 0))
        return 1;
      return 10;
    },
    isTodos() {
      if (this.note.todos && this.note.todos.length > 0) return true;
    }
  },
  data() {
    return {
      isGetImg: false,
      note: { text: "" },
      newTodo: "",
      styleObject: {
        backgroundColor: '#ffffff',
        fontFamily: 'Impact, Charcoal, sans-serif',
        color: '#000000',
        fontSize: '12px',
        textAlign: 'left'
      }
    };
  },
  created() {
    const noteId = this.$route.params.noteId;
    if (noteId) {
      noteService.getById(noteId).then(note => {
        this.note = note;
        this.styleObject = note.style;
      });
    }
  },
  methods: {
    saveNote() {
      console.log(this.note);
      this.saveStyle();
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
    },
    deleteTodo(todoIdx) {
      this.note = noteService.deleteTodo(this.note, todoIdx);
    },
    moveTodo(todoIdx, whereTo) {
      this.note = noteService.moveTodo(this.note, todoIdx, whereTo);
    },
    addTodo(newTodo, note) {
      if (!this.newTodo) return;
      this.note = noteService.addTodo(newTodo, note);
      this.$router.push(`/note/edit/${note.id}`);
      this.$refs.newTodo.value = "";
    },
    saveStyle() {
      this.note.style = this.styleObject;
    },
    uploadFile(event){
      let file = event.target.files[0];
      let imageURL = URL.createObjectURL(file)
      this.note.image = imageURL;
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
