'use strict'

export default {
    template: `
    <section class="email-filter">
        I am filterrrrr
        <input  v-model="filter.text" @input="emitFilter" type="text" placeholder="Filter by subject">
        <label>
            All
            <input v-model="filter.emailStatus" @change="emitFilter" :value.number="0" type="radio" name="filter">
        </label>
        <label>
            Read
            <input v-model="filter.emailStatus" @change="emitFilter" :value="true" type="radio" name="filter">
        </label>
        <label>
            Unread
            <input v-model="filter.emailStatus" @change="emitFilter" :value="false" type="radio" name="filter">
        </label>
    </section>
    `,
    data() {
        return {
            filter: {
                emailStatus: 0,
                text: '',
            }
        }
    },
    methods: {
        emitFilter() {
            // console.log('fi',this.filter.emailStatus)
            this.$emit('filtered', this.filter);
        }
    } 
}