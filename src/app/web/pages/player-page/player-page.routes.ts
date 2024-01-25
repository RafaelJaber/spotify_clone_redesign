import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

export const PLAYER_PAGE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];
