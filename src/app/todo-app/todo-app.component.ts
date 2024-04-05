import { Component } from '@angular/core';
import { Todo } from './Todo';
import { Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css'
})
export class TodoAppComponent {
  todos : Todo[] = [];
  originalTodos: Todo[] = [];
  newTodo: string;
  todo: Todo;
  filterType: string = '';
  selectedFilter: string = '';
  pendingList : Todo[] = [];
  completedList : Todo[] = [];
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.todo = new Todo();
    const localStorage = document.defaultView?.localStorage;  
    if (localStorage) {
      const localData = localStorage.getItem('todoApp');
      if(localData != null){
        this.todos = JSON.parse(localData);
        this.originalTodos = this.todos;
      }
    }
  }




  saveTodo(){
    if(this.newTodo){
      this.todo.name = this.newTodo;
      this.todo.isCompleted = false
      const task = JSON.stringify(this.todo);
      const parseTask = JSON.parse(task)
      this.todos.push(parseTask); 
      this.originalTodos = this.todos;
      this.newTodo = '';
      localStorage.setItem('todoApp', JSON.stringify(this.todos));
    } else {
       alert("Please enter Todo");
    }
  }

  done(id:number){
    //this.todos[id].isCompleted = !this.todos[id].isCompleted;
    if(this.filterType == "Completed"){
      this.todos = this.originalTodos.filter(m=>m.isCompleted == true);
    }
    else if(this.filterType == "Pending"){
      this.todos = this.originalTodos.filter(m=>m.isCompleted == false);
    }
    else {
      this.todos = this.originalTodos;
    }
    localStorage.setItem('todoApp', JSON.stringify(this.todos));
  }

  removeTodo(id:number){
    this.todos = this.originalTodos.filter((v, i)=> i !== id);
    this.originalTodos = this.todos;
    
    localStorage.setItem('todoApp', JSON.stringify(this.todos));
  }

  setFilter(type:string){
    this.filterType = type;
    this.selectedFilter = '';
    if(this.filterType == "Completed"){
      this.todos = this.originalTodos.filter(m=>m.isCompleted == true);
    }
    else if(this.filterType == "Pending"){
      this.todos = this.originalTodos.filter(m=>m.isCompleted == false);
    }
    else {
      this.todos = this.originalTodos;
    }
  }
}
