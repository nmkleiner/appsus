export default {
    props: ["todos"],
    template:`
    <section class="">
        <ol>
            <li v-if="todos" v-for="todo in todos">
                {{todo}}
            </li>
        </ol>
    </section>
    `,
    data() {
        return {
        }
    },
    methods : {
    }
}