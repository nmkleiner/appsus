'use strict'

export default {
    template: `
    <!-- <section class="email-sort d-flex align-items-center"> -->
        
        <div class="button btn-success d-flex align-items-center">
            <button @click="emitSortTime" class="btn btn-primary btn-sm">
                <i class="fas fa-sort"></i>
                <i class="far fa-clock"></i>
            </button>
            <button @click="emitSortSubject" class="btn btn-primary btn-sm">
            <i v-if="sortUp" class="fas fa-sort-alpha-up"></i>
            <i v-else class="fas fa-sort-alpha-down"></i>
            </button>

</div>

    <!-- </section> -->
    `,
    methods: {
        emitSortTime() {
            this.$emit('time-sorted')
        },
        emitSortSubject() {
            this.sortUp = !this.sortUp
            this.$emit('subject-sorted')
        }
    } ,
    data() {
        return {
            sortUp: true,
        }
    }
}