'use strict'

export default {
    props: ['email'],
    template: `
    <section class="email-details">
       subject: {{email.subject}}<br><br> {{email.body}}
    </section>
    `,
    
}