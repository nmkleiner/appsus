'use strict';

import emailApp from '../misterEmail/js/pages/email-app.cmp.js'
import emailCompose from '/misterEmail/js/cmps/email-compose.cmp.js'
// import car from './pages/car/car.js'
// import carDetails from './pages/car/car-details.js'
// import carEdit from './pages/car/car-edit.js'


const routes = [
    // {path: '/', component: home},
    {path: '/email', component: emailApp},
    {path: '/compose', component: emailCompose},
    // {path: '/car', component: car},
    // {path: '/car/edit/:carId?', component: carEdit},
    // {path: '/car/:carId', component: carDetails},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;