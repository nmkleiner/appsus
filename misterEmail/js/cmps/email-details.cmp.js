'use strict'

export default {
    props: ['email'],
    template: `
    <section class="email-details">
        {{email.subject}}<br> {{email.body}}
    </section>
    `,
    
}