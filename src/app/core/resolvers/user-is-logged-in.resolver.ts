import { SpotifyService } from '@domain/services/spotify.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const UserIsLoggedInResolver = () =>
  new Promise(async (res, rej) => {
    const spotifyService = inject(SpotifyService);
    const router = inject(Router);
    const token = localStorage.getItem('token');

    const unauthenticated = () => {
      localStorage.clear();
      router.navigateByUrl('/login');
      rej('UNAUTHENTICATED USER');
      return false;
    };

    if (!token) {
      return unauthenticated();
    }

    const createdUser = await spotifyService.initializerUser();
    if (createdUser) {
      res(true);
    } else {
      res(unauthenticated());
    }

    return false;
  });
