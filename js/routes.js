import emailApp from '../misterEmail/js/pages/email-app.cmp.js'
import emailCompose from '/misterEmail/js/pages/email-compose.cmp.js'
import keepApp from '../missKeep/pages/miss-keep.cmp.js'
import noteEdit from '../missKeep/pages/note-edit.cmp.js'
// import about from './pages/about.js'
// import car from './pages/car/car.js'
// import carDetails from './pages/car/car-details.js'
import emailDetails from '../misterEmail/js/cmps/email-details.cmp.js'


const routes = [
    // {path: '/', component: home},
    {path: '/email', component: emailApp},
    {path: '/compose', component: emailCompose},
    {path: '/note', component: keepApp},
    {path: '/email/:emailId', component: emailDetails},
    {path: '/note/edit/:noteId?', component: noteEdit},
    // {path: '/car', component: car},
    // {path: '/car/:carId', component: carDetails},
  ];
 
Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;