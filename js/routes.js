'use strict';

import home from './pages/home.js'
import about from './pages/about.js'
import car from './pages/car/car.js'
import carDetails from './pages/car/car-details.js'
import carEdit from './pages/car/car-edit.js'


const routes = [
    {path: '/', component: home},
    {path: '/about', component: about},
    {path: '/car', component: car},
    {path: '/car/edit/:carId?', component: carEdit},
    {path: '/car/:carId', component: carDetails},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;