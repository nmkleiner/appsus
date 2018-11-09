import noteService from '../services/note-service.js'

export default {
  props: ["todos"],
  template: `
    <section v-if="todos" class="note-todos">
        <ol>
            <li v-if="todos" v-for="(todo, index) in todos">
                {{todo}}
                <i class="delete-btn far fa-trash-alt" 
                @click.stop="deleteTodo(index)"></i>
                <i class="move-btn fas fa-caret-up" @click.stop="moveTodo(index,'up')"></i>
                <i class="move-btn fas fa-caret-down" @click.stop="moveTodo(index,'down')"></i>
                
            </li>
        </ol>

    </section>
    `,
  data() {
    return {
      isNewTodo: false
    };
  },
  methods: {
    deleteTodo(todoIdx) {
      this.$emit('delete-todo', todoIdx)
    },
    moveTodo(todoIdx, whereTo){
      if (todoIdx===0 && whereTo === 'up' || 
      this.todos.length-1 === todoIdx && whereTo === 'down') return;
      this.$emit('move-todo', todoIdx, whereTo)

    }
  }
};
