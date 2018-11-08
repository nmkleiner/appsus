export default {
    props: ["img"],
    template:`
    <section class="note-img">
        <img v-if="img" :src="img" alt="">
    </section>
    `,
    data() {
        return {
        }
    },
    methods : {
    }
}