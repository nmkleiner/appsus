'use strict'
import emailPreview from './email-preview.cmp.js'
import eventBus, {  EMAIL_READ } from "/mainservices/event-bus.service.js";


export default {
    props: ['emails'],
    template: `
    <section class="email-list ">
        <div class="empty-message" v-if="emails.length===0">Congratulations, nothing here!</div>
            <email-preview v-for="(currEmail,idx) in emails" 
            :email="currEmail" :idx="idx" :key="currEmail.id" @click.native="selectEmail(currEmail)"></email-preview>
    </section>
    `,
    components: {
        emailPreview
    },
    methods: {
        selectEmail(email) {
            eventBus.$emit(EMAIL_READ,email,true)
            this.$emit('email-selected', email)
        }
    },
    data() {
        return {
            selectedEmail: this.emails[0],
        }
    }
    
}
