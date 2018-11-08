import eventBus, { EMAIL_DELETED, EMAIL_READ } from "/mainservices/event-bus.service.js";


export default {
  props: ["email"],
  template: `
    <section @click="isRead = true"  class="email-preview d-flex justify-content-between" :class="{'read-email' : isRead}">
      <div class="text-container d-flex flex-column">
        <div class="subject">
          <i class="fas fa-user"></i>
          <span class="subject">{{email.subject}}</span>
        </div>
          <span>{{timeToShow}}</span>
        </div>    
       
        <div class="btn-container align-self-center">

            <button class="btn btn-sm btn-warning" 
            @click.stop="readEmail()">
                <i v-if="isRead" title="Mark as unread" class="fas fa-envelope-open"></i>
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
    },
    readEmail() {
      this.isRead = !this.isRead;
      this.email.isRead = !this.email.isRead;
      eventBus.$emit(EMAIL_READ,this.email)
    }
  },
  computed: {
    timeToShow() {
      var dayInMs = 86400*1000
      if (Math.abs(this.email.timeSent - this.now) < dayInMs) {
        return moment(this.email.timeSent).format('hh:mm a') 
      }
      return moment(this.email.timeSent).format('MM/DD/YY hh:mm a')
    }
  },
  data() {
    return {
      now: null,
      isRead: null ,
    }
  },
  created() {
    this.now = Date.now()
    this.isRead = this.email.isRead
  }
  // mounted() {

  //   // this.now = timeService.now
  //   // console.log(this.now)

  // },
  
 
};
