'use strict'

export default {
    props: ['emails'],
    template: `
    <section class="email-status">
        <div class="outer">
        <!-- <span>{{progress}}%</span> -->
                <div class="progress d-flex justify-content-center" :style="{ width: progress + '%', backgroundColor: progressColor}"></div>
        </div>
    </section>
    `,
    // data() {
    //     return {

    //     }
    // }
    computed: {
        progress() {
            var readenCount = this.emails.filter(email => email.isRead).length
            if (!readenCount) return 1;
            return Math.round(readenCount/this.emails.length * 100)
        },
        progressColor() {
            if (this.progress < 30) return 'red'
            if (this.progress < 65 ) return 'yellow'
            return 'green'
        }
    }
}