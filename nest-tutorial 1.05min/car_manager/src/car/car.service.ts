/* eslint-disable */
import { Injectable, HttpException } from '@nestjs/common';
import {CARS} from './cars.mock'

//to make car service injectable we use the @injectable decorator
@Injectable()
export class CarService {

    private cars=CARS;

    public  getCars(){
        return this.cars;
    }

    public  postCar(car){
        //add car to cars
        return this.cars.push(car);
    }

/*
    public  getCarById(id: number){

        
        const car=this.cars.find((car) => car.id === id);

        if(car){
            throw new HttpException('Not found', 404);
        }
        return car;
        
    }

    */

    public  getCarById(id: number): Promise<any>{

        const carId= Number(id);
        return new Promise((resolve) => {
            const car=this.cars.find((car) => car.id === carId);

            if(!car){
                throw new HttpException('Not found', 404);
            }
            return resolve(car);
        });

        /*
        const car=this.cars.find((car) => car.id === id);

        if(car){
            throw new HttpException('Not found', 404);
        }
        return car;
        */
    }

    public  deleteCarById(id: number): Promise<any>{

        const carId= Number(id);
        return new Promise((resolve) => {

        const index=this.cars.findIndex((car) => car.id === carId); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.cars.splice(index,1)
        //return this.cars;
        return resolve(this.cars);
    })
    }

    //update data
    public  putCarById(id: number, propertyName: string, propertyValue: string): Promise<any>{

        const carId= Number(id);
        return new Promise((resolve) => {

        const index=this.cars.findIndex((car) => car.id === carId); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.cars[index][propertyName]=propertyValue;
        //return this.cars;
        return resolve(this.cars);
        //or return only the car thats changed
        //return resolve(this.cars[index])
    })
    }
}
