'use strict'

export default {
    template: `
    <section class="email-filter d-flex align-items-center">
        <div class="btn btn-dark">
            <input class="text-input" v-model="filter.text" @input="emitFilter" type="text" placeholder="Search">
        </div>
        
        <div class="btn button-container d-flex align-items-center">
            <div class="filter-btn btn-dark warning-color" @click="changeFilter(0)">
                <span :class="{'filtered-text' : filter.emailStatus === 0}">All</span>
            </div>
            <div class="filter-btn btn-dark" @click="changeFilter(false)">
                <span :class="{'filtered-text' : filter.emailStatus === false}">Unread</span>  
            </div>
            <div class="filter-btn btn-dark" @click="changeFilter(true)">
                <span :class="{'filtered-text' : filter.emailStatus}">Read</span>
            </div>
        </div>
        
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
            this.$emit('filtered', this.filter);
        },
        changeFilter(emailStatus) {
            this.filter.emailStatus = emailStatus
            this.emitFilter()
        }
    } 
}