import { Service } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  completed: boolean;
  description: string;
  priority: number;
}

@Service()
export class TodoService {
  private readonly todosSubject$ = new BehaviorSubject<TodoItem[]>([]);

  readonly todos$: Observable<TodoItem[]> = this.todosSubject$.asObservable();

  add(description: string): void {
    this.todosSubject$.next([
      ...this.todosSubject$.getValue(),
      {
        id: 2,
        description,
        completed: false,
        priority: 2,
      },
    ]);
  }

  getTodos(): Observable<TodoItem[]> {
    return this.todos$;
  }
}
