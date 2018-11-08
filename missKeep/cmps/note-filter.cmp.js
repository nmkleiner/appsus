export default {
    template:`
    <section class="note-filter">
        <input type="text" v-model="filter.byWord" @input="emitFilter" placeholder="Filter Notes" />
    </section>
    `,
    data() {
        return {
            filter: {byWord: ''}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        }
    }
}