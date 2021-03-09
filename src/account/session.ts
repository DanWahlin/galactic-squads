import { observable } from '@microsoft/fast-element';
import { DI } from '@microsoft/fast-foundation';
import { Route } from '@microsoft/fast-router';
import { Http, isSuccess, Response, ResponseStatus } from '../kernel/http';
import { User } from './user';

export interface Session {
  readonly isWorking: boolean;
  readonly isLoggedIn: boolean;
  readonly currentUser: User;

  login(request: LoginRequest): Promise<Response<LoginBody>>;
  logout(): void;

  captureReturnUrl(): void;
  navigateToLoginDestination(): void;
}

export type LoginRequest = {
  username: string;
  password: string;
}

export type LoginBody = {
  user: User
};

class SessionImpl implements Session {
  private returnUrl: string = '';
  @observable public currentUser: any = null;
  @observable public isWorking = false;

  constructor(@Http private http: Http) {}

  public get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
  
  public async login(request: LoginRequest): Promise<Response<LoginBody>> {
    try {
      this.isWorking = true;

      if (!request.username || !request.password) {
        return {
          head: {
            status: ResponseStatus.failure,
            message: 'Please provide a username and password if you wish to login.'
          }
        };
      }

      const response = await this.http.postAnonymous<LoginBody>('account/login', request);

      if (isSuccess(response)) {
        this.currentUser = response.body.user;
      }

      return response;
    } catch {
      return {
        head: {
          status: ResponseStatus.failure,
          message: 'Unknown Error: Please try again later.'
        }
      };
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