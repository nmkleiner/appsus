import eventBus, { EMAIL_DELETED } from "/mainservices/event-bus.service.js";

export default {
  props: ["email"],
  template: `
    <section  class="email-preview d-flex justify-content-between" :class="{'read-email' : email.isRead}">
        {{email.subject}}
        <div class="btn-container">

            <button class="btn btn-sm btn-warning" 
            @click.stop="email.isRead = !email.isRead">
                <i v-if="email.isRead" title="Mark as unread" class="fas fa-envelope-open"></i>
                <i v-else title="Mark as read" class="fas fa-envelope"></i>
            </button>
            <button class="btn btn-sm btn-warning delete" title="Delete" @click.stop="deleteEmail(email)">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </section>
    `,
  methods: {
    deleteEmail(email) {
      eventBus.$emit(EMAIL_DELETED, email.id);
    }
  }
};
