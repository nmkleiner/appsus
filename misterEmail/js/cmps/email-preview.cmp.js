'use strict'

export default {
    props: ['email'],
    template: `
    <section  class="email-preview">
        {{email.subject}},{{email.isRead}}
    </section>
    `,
    
}