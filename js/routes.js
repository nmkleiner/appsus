import emailApp from '../misterEmail/js/pages/email-app.cmp.js'
import emailCompose from '/misterEmail/js/pages/email-compose.cmp.js'
import keepApp from '../missKeep/pages/miss-keep.cmp.js'
import noteEdit from '../missKeep/pages/note-edit.cmp.js'
import emailDetails from '../misterEmail/js/cmps/email-details.cmp.js'


const routes = [
    {path: '/email', component: emailApp},
    {path: '/compose', component: emailCompose},
    {path: '/note', component: keepApp},
    {path: '/email/:emailId', component: emailDetails},
    {path: '/note/edit/:noteId?', component: noteEdit},
  ];
 
Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;