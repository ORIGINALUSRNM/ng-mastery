import { NgClass } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { TodoService, TodoItem } from '../todo.service';

@Component({
  imports: [NgClass],
  selector: 'app-todo-list',
  styleUrl: './todo-list.scss',
  templateUrl: './todo-list.html',
})
export class TodoList {
  private readonly todoService = inject(TodoService);

  protected todos = this.todoService.todos;

  protected completed = computed(() => this.todos().filter((item) => item.completed).length);

  protected remaining = computed(() => this.todos().length - this.completed());

  handleCompleteChange(id: string, checked: boolean) {
    this.todoService.toggleCompleted(id, checked);
  }

  handleDeleteTodoClick(todo: TodoItem) {
    this.todoService.removeItem(todo);
  }

  handleDeleteAllCompleted() {
    this.todoService.removeAllCompleted();
  }
}
