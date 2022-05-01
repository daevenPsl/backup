/* eslint-disable */
import { Controller, Delete, Get, Param, Post, Put, Query, Body } from '@nestjs/common';
//import car service in controller
import {CarService} from './car.service'
import { CarDto } from './car.dto';

//dto=> data transfer object...its equivalent to creating a type. It defines how data will be sent
//over a network
//create a .dto file (car.dto.ts)

@Controller('car')
export class CarController {
    //inject carservice into carcontroller
    constructor(private carService: CarService) {}

    
    //this creates a get route 
    //http://localhost:3000/car
    @Get()
    public getCars(){
        return this.carService.getCars()
    }


    //@body helps us access body of post request
    //create cardto to create car type
    @Post()
    public postCar(@Body() car: CarDto){
        return this.carService.postCar(car);
    }

    //route is /car/:id
    //to access parameters(id) we use @param
    @Get(':id')
    public async getCarById(@Param('id') id:number ){
        return this.carService.getCarById(id);
    }

    @Delete(':id')
    public async deleteCarById(@Param('id') id:number ){
        this.carService.deleteCarById(id);
    }

    //to access query we add @query
    @Put(':id')
    public async putCarById(@Param('id') id:number, @Query() query ){
        const propertyName = query.property_name;
        const propertyValue= query.property_value;
        return this.carService.putCarById(id, propertyName, propertyValue);
    }
}
