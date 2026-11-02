import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, signal, OnInit, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoInput } from './todo-input/todo-input';
import { TodoList } from './todo-list/todo-list';

@Component({
  imports: [AsyncPipe, TodoInput, TodoList, JsonPipe],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly todoService = inject(TodoService);

  ngOnInit() {
    console.log(this.todoService);
  }

  handleTodoAdded(todo: string) {
    this.todoService.add(todo);
  }
}
