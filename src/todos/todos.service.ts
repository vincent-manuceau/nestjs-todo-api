import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
    todos:Todo[] = [
        {
            id:1,
            title: 'Titre de la todo',
            description: 'Description de ce todo',
            done: false,
        },
        {
            id:2,
            title: 'bread',
            description: 'buy bread',
            done: true,
        },
        {
            id:3,
            title: 'wine',
            description: 'buy wine',
            done: true,
        }
    ];

    findOne(id: string){
        return this.todos.find(todo => todo.id === Number(id))
    }

    findAll(): Todo[]{
        return this.todos;
    }

    create(todo:CreateTodoDto){
        this.todos = [...this.todos, todo];
    }

    update(id:string, todo:CreateTodoDto){
        //Recuperer le todo 
        const todoToUpdate = this.todos.find(t => t.id === +id)
        if(!todoToUpdate){
            return new NotFoundException('id not found for update id'+id)
        }
        //Appliquer les modifs de facon granulaire
        if (todo.hasOwnProperty('done') ){
            todoToUpdate.done = todo.done
        }

        if (todo.title ){
            todoToUpdate.title = todo.title
        }

        if (todo.description ){
            todoToUpdate.description = todo.description
        }

        const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate )
        this.todos = [...updatedTodos]

        return {updatedTodo:1, todo: todoToUpdate}
    }

    delete(id:string){
        const nbTodosBeforeDelete = this.todos.length;
        this.todos = [...this.todos.filter(t => t.id !== +id)]
        if (this.todos.length < nbTodosBeforeDelete){
            return { deletedTodos:1, nbTodos:this.todos.length }
        }
        else{
            return { deletedTodos:0, nbTodos:this.todos.length }
        }

        
    }
}
