import { Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TodoItem {
  id: string;
  completed: boolean;
  description: string;
}

@Service()
export class TodoService {
  private readonly todosSubject$ = new BehaviorSubject<TodoItem[]>([]);

  readonly todos$: Observable<TodoItem[]> = this.todosSubject$.asObservable();

  add(description: string): void {
    this.todosSubject$.next([
      ...this.todosSubject$.getValue(),
      {
        id: crypto.randomUUID(),
        description,
        completed: false,
      },
    ]);
  }

  getTodos(): Observable<TodoItem[]> {
    return this.todos$;
  }

  removeItem(todo: TodoItem): void {
    this.todosSubject$.next([
      ...this.todosSubject$.getValue().filter((item) => item.id !== todo.id),
    ]);
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
  }
}
