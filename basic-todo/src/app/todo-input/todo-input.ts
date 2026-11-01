import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-todo-input',
  styleUrl: './todo-input.scss',
  templateUrl: './todo-input.html',
})
export class TodoInput {
  readonly todoAdded = output<string>();

  addTodo(input: HTMLInputElement) {
    const description = input.value.trim();
    input.value = '';
    this.todoAdded.emit(description);
  }
}
