/* eslint-disable */

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { todoDto } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(private todoService : TodoService){}

    @Get()
    public getTodos(){
        return this.todoService.getTodos();
    }

    @Post()
    public postTodos(@Body() todo: todoDto){
        return this.todoService.postTodos(todo);
    }

    @Delete(':id')
    public async deleteTodo(@Param('id') id:number){
        this.todoService.deleteTodo(id);
    }
}
