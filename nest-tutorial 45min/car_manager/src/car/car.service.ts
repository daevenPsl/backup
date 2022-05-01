/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {CARS} from './cars.mock'

//to make car service injectable we use the @injectable decorator
@Injectable()
export class CarService {

    private cars=CARS;

    public  getCars(){
        return this.cars;
    }

    public  postCar(car){
        return;
    }

    public  getCarById(id){
        return;
    }

    public  deleteCarById(id){
        return;
    }

    //update data
    public  putCarById(id){
        return;
    }
}
