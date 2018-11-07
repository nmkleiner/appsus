"use strict";
// import eventBus, {Back_TO_APPSUS} from '../mainservices/event-bus.service.js'
import eventBus, { Back_TO_APPSUS } from "/mainservices/event-bus.service.js";

import emailList from "../cmps/email-list.cmp.js";
import emailDetails from '../cmps/email-details.cmp.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
// import emailCompose from '../cmps/email-compose.cmp.js'
// import emailStatus from '../cmps/email-status.cmp.js'
import emailService from "../services/email.service.js";

export default {
  template: `
    <section class="email-app">
        <header>
          <router-link   to="/">
            <div class="btn btn-sm btn-dark" @click="backToAppsus">
              <i class="fas fa-arrow-circle-left"></i>
            </div>
          </router-link>

        

        </header>
        
        <!-- <email-filter></email-filter> -->
        <email-list @email-selected="selectEmail" :emails="emails"></email-list>

        <!-- <router-view> -->
          <email-details :email="selectedEmail"></email-details>
        <!-- <email-compose></email-compose> -->
        <!-- </router-view> -->

        <footer>
          <!-- <email-status></email-status> -->
        </footer>
    </section>
    `,
  data() {
    return {
      // emails: null,
      emails: [
        {subject: '1', body: '12oasdnfoanfoadnf', isRead: false}
        ,{subject: '2', body: '23adsfadfadsfadf', isRead: true},
        {subject: '3', body: '34adfadfasdfadf', isRead: false}
      ],
      filter: null,
      selectedEmail: null,
    };
  },
  computed: {
    emailsToShow() {
      // show by filter
    }
  },
  created() {
    // get from email service
    ema
  },
  methods: {
    backToAppsus() {
      eventBus.$emit(Back_TO_APPSUS);
    },
    selectEmail(email) {
      this.selectedEmail = email
    }
  },
  created() {
    this.selectedEmail = this.emails[0]
    console.log('selected email:',this.selectedEmail)
  },
  components: {
    emailList,
    emailDetails,
    // emailFilter,
    // emailCompose,
    // emailStatus
  }
};

// export default {
//   template: `
//     <section class="book-app">
//       <button v-if="!isFilterOpen" class="btn btn-success" @click="isFilterOpen = !isFilterOpen">Filter the list</button>
//       <book-filter v-if="!isBookSelected && isFilterOpen" v-on:filtered="setFilter" @close-filter="isFilterOpen = !isFilterOpen"></book-filter>
//       <add-book></add-book>
//       <book-list v-if="!isBookSelected" v-bind:books="booksToShow" v-on:selected="selectBook"></book-list>
//       <book-details @go-back="goBack" v-if="isBookSelected" v-bind:book="selectedBook"></book-details>
//         <!-- <footer v-if="!isBookSelected">Didn't find your book? Email me at <a>shubi@dubi.com</a></footer> -->
//     </section>
//     `,
//   data() {
//     return {
//       books: null,
//       isBookSelected: false,
//       filter: {
//         byTitle: "",
//         minPrice: 0,
//         maxPrice: Infinity
//       },
//       selectedBook: null,
//       isFilterOpen: false
//     };
//   },
//   computed: {
//     booksToShow() {
//       if (
//         !this.filter.byTitle &&
//         this.filter.maxPrice === Infinity &&
//         !this.filter.minPrice
//       )
//         return this.books;
//       return this.books
//         .filter(book => book.listPrice.amount < this.filter.maxPrice)
//         .filter(book => book.listPrice.amount > this.filter.minPrice)
//         .filter(book => book.title.includes(this.filter.byTitle));
//     },
//   },
//   created() {
//     var books = bookService.query();
//     books.then(books => {
//       this.books = books;
//     });
//   },
//   methods: {
//     selectBook(bookId) {
//       this.isBookSelected = true;
//       this.selectedBook = bookService.getBookById(bookId);
//       document.querySelector("#app").scrollIntoView();
//     },
//     setFilter(filter) {
//       if (!filter.minPrice) filter.minPrice = 0;
//       if (!filter.maxPrice) filter.maxPrice = Infinity;
//       this.filter.minPrice = filter.minPrice;
//       this.filter.maxPrice = filter.maxPrice;
//       this.filter.byTitle = filter.byTitle;
//     },
//     goBack() {
//       this.isBookSelected = false;
//     }
//   },
//   components: {
//     bookList,
//     bookFilter,
//     bookDetails,
//     addBook
//   }
// };
