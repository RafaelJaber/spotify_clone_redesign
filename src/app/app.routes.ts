import { Routes } from '@angular/router';
import { UserIsLoggedInResolver } from '@core/resolvers/user-is-logged-in.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./web/pages/login-page/login-page.router').then(
        (r) => r.LOGIN_PAGE_ROUTER,
      ),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./web/pages/player-page/player-page.routes').then(
        (r) => r.PLAYER_PAGE_ROUTES,
      ),
    resolve: {
      userIsLoggedIn: UserIsLoggedInResolver,
    },
  },
  {
    path: '',
    redirectTo: '/player',
    pathMatch: 'full',
  },
];
