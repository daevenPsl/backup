/* eslint-disable */
import { Controller, Get } from '@nestjs/common';
//import car service in controller
import {CarService} from './car.service'

@Controller('car')
export class CarController {
    //inject carservice into carcontroller
    constructor(private carService: CarService) {}

    
    //this creates a get route 
    //http://localhost:3000/car
    @Get()
    async getCars(){
        return this.carService.getCars()
    }

    public postCar(car){
        
    }

    public getCarById(){

    }

    public deleteCarById(){
        
    }

    public putCarById(){
        
    }
}
