"use strict";

export default {
  props: ["email"],
  template: `
    <section class="email-details">

      <div class="btns-container">
        
        <button class="btn btn-dark">
          <input type="color" v-model="prefs.color">
          <i class="fas fa-pencil-alt"></i>
        </button>

        <button class="btn btn-dark">          
          <input type="color" v-model="prefs.backgroundColor">
          <i class="fas fa-palette"></i>
        </button>

      </div>
      
      <div class="text-container" :style="{backgroundColor : prefs.backgroundColor, color: prefs.color}">
        <span v-if="email.timeSent">Subject:</span>
         <span class="subject">{{email.subject}}</span><br>
         <span v-if="email.timeSent">Sent at: {{timeToShow}}</span>
         <br> {{email.body}}
      </div>

    </section>
    `,
  computed: {
    timeToShow() {
      return moment(this.email.timeSent).format("MM/DD/YY hh:mm a");
    }
  },
  data() {
    return {
      prefs: {
        backgroundColor: "#ffffff",
        color: "#000000"
      }
    };
  }
};
