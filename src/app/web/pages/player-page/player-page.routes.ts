import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { PlayerPageComponent } from './player-page.component';
import { ArtistsPageComponent } from '@web/pages/artists-page/artists-page.component';
import { LikeMusicsPageComponent } from '@web/pages/like-musics-page/like-musics-page.component';
import { TrackListPageComponent } from '@web/pages/track-list-page/track-list-page.component';

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
        path: 'like-musics',
        component: LikeMusicsPageComponent,
      },
      {
        path: 'artists',
        component: ArtistsPageComponent,
      },
      {
        path: 'list/:type/:id',
        component: TrackListPageComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];
