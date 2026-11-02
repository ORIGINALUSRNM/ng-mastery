import { Service, inject, signal, effect } from '@angular/core';
import { StorageService } from './storage.service';

export interface TodoItem {
  id: string;
  completed: boolean;
  description: string;
}

@Service()
export class TodoService {
  private readonly STORAGE_KEY = 'ng-mastery-basic-todos';

  private readonly storageService = inject(StorageService);

  private readonly _todos = signal<TodoItem[]>(this.storageService.get(this.STORAGE_KEY) ?? []);

  readonly todos = this._todos.asReadonly();

  constructor() {
    effect(() => this.storageService.set(this.STORAGE_KEY, this._todos()));
  }

  add(description: string): void {
    this._todos.update((list) => [
      ...list,
      { id: crypto.randomUUID(), description, completed: false },
    ]);
  }

  removeAllCompleted() {
    this._todos.update((list) => list.filter((item) => !item.completed));
  }

  removeItem(todo: TodoItem): void {
    this._todos.update((list) => list.filter((item) => item.id !== todo.id));
  }

  toggleCompleted(id: string, completed: boolean) {
    this._todos.update((list) =>
      list.map((item) => (item.id === id ? { ...item, completed } : item)),
    );
  }
}
