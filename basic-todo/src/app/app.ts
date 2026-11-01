import { AsyncPipe } from '@angular/common';
import { Component, signal, OnInit, inject } from '@angular/core';
import { TodoService } from './todo.service';
import { TodoInput } from './todo-input/todo-input';

@Component({
  imports: [AsyncPipe, TodoInput],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly todoService = inject(TodoService);

  protected readonly todos$ = this.todoService.getTodos();

  ngOnInit() {
    console.log(this.todoService);
  }

  handleTodoAdded(todo: string) {
    this.todoService.add(todo);
  }
}
