// import utilService from './util.service.js'

import storageService from './storage.service.js'
import utilService from './util.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

const KEY = 'carsAppKey';

function query(filter = null) {
    return storageService.load(KEY)
        .then(cars => {
            if (!cars || !cars.length) {
                cars = createInitialCars();
                storageService.store(KEY, cars);
            }
            console.log('Cars: ', cars);
            if (filter === null) return cars;
            else return cars.filter(car => 
                            car.vendor.toUpperCase().includes(filter.byVendor.toUpperCase()))
        })
}

function getById(carId) {
    return storageService.load(KEY)
        .then(cars => {
            return cars.find(car => car.id === carId);
        })
}

function deleteCar(carId) {
    return storageService.load(KEY)
        .then(cars => {
            var carIdx = cars.findIndex(car => car.id === carId);
            cars.splice(carIdx, 1);
            return storageService.store(KEY, cars);
        })
}


function saveCar(car) {
    return storageService.load(KEY)
        .then(cars => {
            // Update
            if (car.id) {
                var carIdx = cars.findIndex(currCar => currCar.id === car.id)
                cars.splice(carIdx, 1, car);
            } else {
                // Add
                car.id = utilService.makeId();
                cars.push(car);
            }
            return storageService.store(KEY, cars);
        });
}

export default {
    query,
    getById,
    deleteCar,
    saveCar
}

function createInitialCars() {
    return ['Audu', 'Subari', 'Suzuli', 'Fiak']
            .map( vendor => (
                                {
                                    id: utilService.makeId(),
                                    price: utilService.getRandomInt(1000, 5000), 
                                    vendor
                                }
                            )
                )
}

