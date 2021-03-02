import { Constructable } from '@microsoft/fast-element';
import { Container, DI } from '@microsoft/fast-foundation';
import { RouterConfiguration, Navigation, Layout } from './router';
import { Session } from './account/session';
import { AccountLogin } from './account/login';
import { AccountSignup } from './account/signup';
import { ConfirmAccount } from './account/confirm';
import { AccountSettings } from './account/settings';
import { HomeScreen } from './home/home';
import { NotFound } from './not-found';
import { anonymousLayout } from './layouts/anonymous-layout';
import { pageLayout } from './layouts/page-layout';

type RouteSettings = {
  public?: boolean
};

export interface MainRouterConfig extends RouterConfiguration<RouteSettings> {}

class Config extends RouterConfiguration<RouteSettings> {
  constructor(@Session private session: Session, @Container private container: Container) {
    super();
  }

  public configure() {
    this.title = "GalacticDB";
    this.defaultLayout = pageLayout;
    this.routes.map(
      { path: '', redirect: 'home' },
      { path: 'home', element: HomeScreen, layout: Layout.default, title: 'Home' },
      { 
        path: 'account', 
        layout: anonymousLayout, 
        settings: { public: true }, 
        title: 'Account',
        children: [
          { path: "login", element: AccountLogin, title: 'Login' },
          { path: 'signup', element: AccountSignup, title: "Signup" },
          { path: 'confirm/{confirmationId}', element: ConfirmAccount, title: "Confirm" },
          { path: 'settings', element: AccountSettings, layout: pageLayout, title: "Settings", settings: { public: false } },
        ] 
      },
      { path: 'not-found', element: NotFound, title: "Not Found" }
    );

    const session = this.session;

    this.routes.fallback(
      () => session.isLoggedIn
        ? { redirect: 'not-found' }
        : { redirect: 'account/login' }
    );

    this.contributors.push({
      navigate(phase) {
        const settings = phase.route.settings;
  
        if (settings && settings.public) {
          return;
        }
  
        if (session.isLoggedIn) {
          return;
        }
  
        phase.cancel(() => {
          session.captureReturnUrl();
          Navigation.replace('account/login');
        });
      }
    });
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}

export const MainRouterConfig = DI.createInterface<MainRouterConfig>(
  x => x.singleton(Config)
);