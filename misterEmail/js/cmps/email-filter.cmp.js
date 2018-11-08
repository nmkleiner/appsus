'use strict'

export default {
    template: `
    <section class="email-filter d-flex align-items-center">

        <input  v-model="filter.text" @input="emitFilter" type="text" placeholder="Search email">
        
        <div class="button btn-dark d-flex align-items-center">
            <div>
                <input v-model="filter.emailStatus" @change="emitFilter" :value="0" type="radio" id="radio01" name="radio">
                <label for="radio01"><span></span>All</label>
            </div>
            <div>
                <input v-model="filter.emailStatus" @change="emitFilter" :value="false" type="radio" id="radio02" name="radio">
                <label for="radio02"><span></span>Unread</label>
            </div>
            <div>
                <input v-model="filter.emailStatus" @change="emitFilter" :value="true" type="radio" id="radio03" name="radio">
                <label for="radio03"><span></span>Read</label>
            </div>
        </div>
        
    </section>
    `,
    data() {
        return {
            filter: {
                emailStatus: '0',
                text: '',
            }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', this.filter);
        },
    } 
}