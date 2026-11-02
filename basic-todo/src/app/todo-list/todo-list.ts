import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoService, TodoItem } from '../todo.service';

@Component({
  imports: [AsyncPipe, NgClass],
  selector: 'app-todo-list',
  styleUrl: './todo-list.scss',
  templateUrl: './todo-list.html',
})
export class TodoList {
  private readonly todoService = inject(TodoService);
  protected todos$ = this.todoService.getTodos();

  handleCompleteChange(id: string, checked: boolean) {
    this.todoService.toggleCompleted(id, checked);
  }

  handleDeleteTodoClick(todo: TodoItem) {
    this.todoService.removeItem(todo);
  }
}
