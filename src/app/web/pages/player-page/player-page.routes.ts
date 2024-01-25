import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { PlayerPageComponent } from './player-page.component';

export const PLAYER_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: PlayerPageComponent,
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
