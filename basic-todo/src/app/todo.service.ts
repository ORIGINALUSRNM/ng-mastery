import { Service, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private readonly todosSubject$ = new BehaviorSubject<TodoItem[]>([]);

  readonly todos$: Observable<TodoItem[]> = this.todosSubject$.asObservable();

  add(description: string): void {
    const newValue = [
      ...this.todosSubject$.getValue(),
      {
        id: crypto.randomUUID(),
        description,
        completed: false,
      },
    ];
    this.todosSubject$.next(newValue);
    this.saveToDataBase();
  }

  getTodos(): Observable<TodoItem[]> {
    const todos = this.storageService.get(this.STORAGE_KEY);
    this.todosSubject$.next(todos || []);
    return this.todos$;
  }

  removeItem(todo: TodoItem): void {
    this.todosSubject$.next([
      ...this.todosSubject$.getValue().filter((item) => item.id !== todo.id),
    ]);
    this.saveToDataBase();
  }

  saveToDataBase() {
    const newValue = this.todosSubject$.getValue();
    this.storageService.set(this.STORAGE_KEY, newValue);
  }

  toggleCompleted(id: string, completed: boolean) {
    this.todosSubject$.next([
      ...this.todosSubject$.getValue().map((item: TodoItem) => {
        if (item.id === id) {
          item.completed = completed;
        }
        return item;
      }),
    ]);
    this.saveToDataBase();
  }
}
