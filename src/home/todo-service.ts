import { observable } from "@microsoft/fast-element";
import { Http } from "../kernel/http";
import { serializeObservables } from "../kernel/serializer";

@serializeObservables('TodoItem')
export class TodoItem {
  @observable description: string = "";
  @observable done: boolean = false;

  constructor(options?: Partial<TodoItem>) {
    Object.assign(this, options);
  }

  public toggleDone() {
      this.done = !this.done;
  }
}

interface TodosResponse {
  results: TodoItem[];
}

export class TodoService {
  private cache: TodoItem[] | null = null;

  constructor(@Http private http: Http) {}

  public async getTodos() {
    if (this.cache !== null) {
      return this.cache;
    }

    // Thanks for the todo ideas: https://www.writeabout.com/2017/11/darth-vaders-to-do-list-6/
    const response = await this.http.get<TodosResponse>('todos');
    return this.cache = response.results;
  }

  public async createTodo(description: string) {
    const todo = new TodoItem({ description });
    await this.getTodos();
    this.cache!.push(todo);
    return todo;
  }

  public async deleteTodo(todo: TodoItem) {
    await this.getTodos();
    const index = this.cache!.indexOf(todo);
    if (index !== -1) {
      this.cache!.splice(index, 1);
    }
  }
}