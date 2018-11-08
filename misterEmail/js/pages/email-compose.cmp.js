"use strict";

export default {
  template: `
    <section>
        <header>
            <router-link to="/email">
            <button class="btn btn-sm btn-dark">
                <i class="fas fa-arrow-circle-left"></i>
            </button>
        </router-link>
        <!-- btn send? or maybe below -->
    </header>
    <div class="email-compose d-flex flex-column">
        <div class="text-container">
            <input type="text" class="text-input" v-model="email.subject" placeholder="subject">
        </div>
        
        <div class="textarea-container">
            <textarea cols="30" class="textarea" v-model="email.body" rows="10" placeholder="content..."></textarea>
        </div>
        <router-link class="align-self-end" to="/email">
            <button class="btn btn-warning btn-sm">send</button>
        </router-link>>
        </div>

    </section>
    `,
    data() {
        return {
            email: {
                subject: '',
                body: '',
                isRead: false
            }
        }
    }
};
