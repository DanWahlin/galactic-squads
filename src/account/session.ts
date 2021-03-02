import { observable } from '@microsoft/fast-element';
import { DI } from '@microsoft/fast-foundation';
import { Http, isSuccess, Response, ResponseStatus } from '../kernel/http';
import { Navigation } from '../router/navigation';
import { User } from './user';

export interface Session {
  readonly isWorking: boolean;
  readonly isLoggedIn: boolean;
  readonly currentUser: User;

  login(request: LoginRequest): Promise<Response<LoginBody>>;
  logout(): void;
  signup(request: SignupRequest): Promise<Response<SignupBody>>;
  confirmAccount(request: ConfirmAccountRequest): Promise<Response<LoginBody>>;

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

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export type SignupBody = {
  confirmationId: string;
}

export type ConfirmAccountRequest = {
  confirmationId: string;
  confirmationCode: string;
}

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
    Navigation.push(this.returnUrl || 'home');
  }

  public async signup(request: SignupRequest): Promise<Response<SignupBody>> {
    try {
      this.isWorking = true;

      if (!request.username || !request.password || !request.email || !request.passwordConfirm) {
        return {
          head: {
            status: ResponseStatus.failure,
            message: 'Please fill out all requested fields if you wish to sign up.'
          }
        };
      }

      return this.http.postAnonymous<SignupBody>('account/signup', request);
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

  public async confirmAccount(request: ConfirmAccountRequest): Promise<Response<LoginBody>> {
    try {
      this.isWorking = true;

      if (!request.confirmationId || !request.confirmationCode) {
        return {
          head: {
            status: ResponseStatus.failure,
            message: 'Please provide a confirmation code.'
          }
        };
      }

      const response = await this.http.postAnonymous<LoginBody>('account/confirm', request);

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
}

export const Session = DI.createInterface<Session>(
  x => x.singleton(SessionImpl)
);