import { inject, Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { IUserModel } from '@domain/interfaces/IUser.model';
import { environment } from '@environments/environment';
import {
  SpotifyArtistsModelListToArtists,
  SpotifyPlaylistModelToPlaylist,
  SpotifyUserModelToUser,
} from '@core/mappers/spotify.mapper';
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

  async getPlaylists(limit = 50) {
    const playlist = await this.spotifyApi.getUserPlaylists(this.user.id, {
      limit,
    });
    return playlist.items.map(SpotifyPlaylistModelToPlaylist);
  }

  async getFeaturedPlaylists() {
    const response = await this.spotifyApi.getFeaturedPlaylists();
    return response.playlists.items.map(SpotifyPlaylistModelToPlaylist);
  }

  async getCategoryPlaylists(categoryId: string = 'toplists') {
    const response = await this.spotifyApi.getCategoryPlaylists(categoryId);
    return response.playlists.items.map(SpotifyPlaylistModelToPlaylist);
  }

  async getTopArtists(limit = 10, offset = 0) {
    const response = await this.spotifyApi.getMyTopArtists({ limit, offset });
    return response.items.map(SpotifyArtistsModelListToArtists);
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
