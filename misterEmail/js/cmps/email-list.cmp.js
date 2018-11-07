'use strict'
import emailPreview from './email-preview.cmp.js'


export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <email-preview v-for="currEmail in emails"
         :email="currEmail" @click.native="selectEmail(currEmail)"></email-preview>
    </section>
    `,
    components: {
        emailPreview
    },
    methods: {
        selectEmail(email) {
            this.$emit('email-selected', email)
        }
    },
    data() {
        return {
            selectedEmail: this.emails[0],
        }
    }
    
}

// props:['books'],
//     template: `
//     <section class="book-list">
//         <book-preview v-for="currBook in books" :key="currBook.id" v-bind:book="currBook"></book-preview>
//     </section>
//     `,
//     components: {
//         bookPreview,
//     },