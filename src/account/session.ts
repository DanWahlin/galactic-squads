import { observable } from '@microsoft/fast-element';
import { DI } from '@microsoft/fast-foundation';
import { Route } from '@microsoft/fast-router';
import { Http } from '../kernel/http';
import { User } from './user';

export interface Session {
  readonly isWorking: boolean;
  readonly isLoggedIn: boolean;
  readonly currentUser: User;

  login(request: LoginRequest): Promise<User | null>;
  logout(): void;

  captureReturnUrl(): void;
  navigateToLoginDestination(): void;
}

export type LoginRequest = {
  username: string;
  password: string;
}

class SessionImpl implements Session {
  private returnUrl: string = '';
  @observable public currentUser: any = null;
  @observable public isWorking = false;

  constructor(@Http private http: Http) {}

  public get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
  
  public async login(request: LoginRequest): Promise<User> {
    try {
      this.isWorking = true;
      this.currentUser = await this.http.post<User>('account/login', request);
      return this.currentUser;
    } finally {
      this.isWorking = false;
    }
  }

  public logout(): void {
    this.currentUser = null;
  }

  public captureReturnUrl() {
    this.returnUrl = location.pathname;
  }

  public navigateToLoginDestination(): void {
    Route.path.push(this.returnUrl || 'home');
  }
}

export const Session = DI.createInterface<Session>(
  x => x.singleton(SessionImpl)
);