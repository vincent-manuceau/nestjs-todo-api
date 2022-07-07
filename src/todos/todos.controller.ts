import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';


@Controller('todos')
export class TodosController {
    constructor(private readonly todosService:TodosService){}
    //localhost:3000/todos/2
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.todosService.findOne(id);
    }
    //localhost:3000/todos
    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }
    
    @Post()
    createTodo(@Body() newTodo: CreateTodoDto) {
        console.log('newTodo', newTodo);
        this.todosService.create(newTodo)
    }

    @Patch(':id')
    updateTodo(@Param('id') id:string, @Body() todo: CreateTodoDto){
        return this.todosService.update(id,todo) 
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        return this.todosService.delete(id);
    }

}
