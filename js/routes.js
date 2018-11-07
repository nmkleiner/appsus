import emailApp from '../misterEmail/js/pages/email-app.cmp.js'
import keepApp from '../missKeep/pages/miss-keep.cmp.js'
// import about from './pages/about.js'
// import car from './pages/car/car.js'
// import carDetails from './pages/car/car-details.js'
// import carEdit from './pages/car/car-edit.js'


const routes = [
    // {path: '/', component: home},
    {path: '/email', component: emailApp},
    {path: '/keep', component: keepApp},
    // {path: '/car', component: car},
    // {path: '/car/edit/:carId?', component: carEdit},
    // {path: '/car/:carId', component: carDetails},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;