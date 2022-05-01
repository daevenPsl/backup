/* eslint-disable */

import { Injectable, HttpException } from '@nestjs/common';
import { TODOS } from './todos.mock';

@Injectable()
export class TodoService {

    private todos= TODOS;

    public getTodos(){
        return this.todos;
    }

    public  postTodos(todo){
        //add todo to todos
        return this.todos.push(todo);
    }


    public  deleteTodo(id: number): Promise<any>{

        const todoId= String(id);

        return new Promise((resolve) => {

        const index=this.todos.findIndex((todo) => todo.id === todoId); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.todos.splice(index,1)
        //return this.cars;
        return resolve(this.todos);
    })
    }

}
