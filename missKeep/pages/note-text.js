import carService from '../../services/car.service.js'

import carList from '../../cmps/car/car-list.js'
import carFilter from '../../cmps/car/car-filter.js'

export default {
    template: `
        <section class="car">
            <h1>Cars App</h1>
            <router-link to="/car/edit">New Car</router-link> 
            <car-filter @filtered="setFilter"></car-filter>
            <car-list :cars="cars"></car-list>
        </section>
    `,
    data() {
        return {
            cars: []
        }
    },
    created() {
        carService.query()
            .then(cars => this.cars = cars)
    },
    methods: {
        setFilter(filter) {
            carService.query(filter)
            .then(cars => this.cars = cars)
        }
    },
    
    components: {
        carList,
        carFilter
    }
}