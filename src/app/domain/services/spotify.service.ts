import { inject, Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { IUserModel } from '@domain/interfaces/IUser.model';
import { environment } from '@environments/environment';
import { SpotifyUserModelToUser } from '@core/mappers/spotify.mapper';
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private spotifyApi!: Spotify.SpotifyWebApiJs;
  private router = inject(Router);

  user!: IUserModel;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  getLoginUrl() {
    const authEndpoint = `${environment.authEndpoint}?`;
    const clientId = `client_id=${environment.clientId}&`;
    const redirectUri = `redirect_uri=${environment.redirectUri}&`;
    const scopes = `scope=${environment.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUri + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async initializerUser() {
    if (this.user) return true;

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      this.setAccessToken(token);
      await this.getUser();
      return !!this.user;
    } catch (e) {
      return false;
    }
  }

  async logout() {
    localStorage.clear();
    await this.router.navigate(['/login']);
  }

  private async getUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserModelToUser(userInfo);
  }
}
