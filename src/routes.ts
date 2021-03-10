import { Constructable } from '@microsoft/fast-element';
import { Container } from '@microsoft/fast-foundation';
import { RouterConfiguration, Route, Layout } from '@microsoft/fast-router';
import { Session } from './account/session';
import { AccountLogin } from './account/login';
import { AccountSettings } from './account/settings';
import { HomeScreen } from './home/home';
import { NotFound } from './not-found';
import { pageLayout } from './layouts/page-layout';
import { ChatList } from './chat/chat-list';

type RouteSettings = {
  public?: boolean
};

export class MainRouterConfig extends RouterConfiguration<RouteSettings> {
  constructor(@Session private session: Session, @Container private container: Container) {
    super();
  }

  public configure() {
    this.title = "GalacticDB";
    this.defaultLayout = pageLayout;
    this.routes.map(
      { path: '', redirect: 'home' },
      { path: 'home', element: HomeScreen, title: 'Home', name: 'home' },
      { 
        path: 'account', 
        layout: Layout.default, 
        settings: { public: true }, 
        title: 'Account',
        children: [
          { path: "login", element: AccountLogin, title: 'Login', name: 'login' },
          { path: 'settings', element: AccountSettings, layout: pageLayout, title: "Settings", name: 'settings', settings: { public: false } },
        ] 
      },
      { path: 'chat', element: ChatList, title: 'Chat', name: 'chat', childRouters: true },
      { path: 'not-found', element: NotFound, title: "Not Found" }
    );

    const session = this.session;

    this.routes.fallback(
      () => session.isLoggedIn
        ? { redirect: 'not-found' }
        : { redirect: 'login' }
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
          Route.name.replace(phase.router, 'login');
        });
      }
    });
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}