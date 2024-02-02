import { inject, Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { IUserModel } from '@domain/interfaces/IUser.model';
import { environment } from '@environments/environment';
import {
  SpotifyArtistsModelListToArtists,
  SpotifyCurrentPlayToCurrentPlay,
  SpotifyMusicModelToMusic,
  SpotifyPlaylistModelToPlaylist,
  SpotifySingleArtistModelToArtist,
  SpotifySinglePlaylistModelToPlaylist,
  SpotifyUserModelToUser,
} from '@core/mappers/spotify.mapper';
import { newCurrentPlay } from '@core/utils/factories';

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

  async getLikedMusics(limit = 50, offset = 0) {
    const response = await this.spotifyApi.getMySavedTracks({ limit, offset });
    const musics = response.items.map((item) => {
      return SpotifyMusicModelToMusic(item.track);
    });

    return {
      musics,
      totalItens: response.total,
      next: response.next ? response.next : null,
      previous: response.previous ? response.previous : null,
      offset: response.offset,
    };
  }

  async getPlaylistMusics(playlistId: string, limit = 50, offset = 0) {
    const playlistResponse = await this.spotifyApi.getPlaylist(playlistId);
    const playlist = SpotifySinglePlaylistModelToPlaylist(playlistResponse);

    const musicsResponse = await this.spotifyApi.getPlaylistTracks(
      playlist.id,
      {
        limit,
        offset,
      },
    );

    playlist.musics = musicsResponse.items.map((music) =>
      SpotifyMusicModelToMusic(music.track as SpotifyApi.TrackObjectFull),
    );

    return {
      playlist,
      totalItens: musicsResponse.total,
      next: musicsResponse.next ? musicsResponse.next : null,
      previous: musicsResponse.previous ? musicsResponse.previous : null,
      offset: musicsResponse.offset,
    };
  }

  async getArtistTrack(artistId: string, limit = 50, offset = 0) {
    const artistResponse = await this.spotifyApi.getArtist(artistId);
    const artist = SpotifySingleArtistModelToArtist(artistResponse);

    const musicsResponse = await this.spotifyApi.getArtistTopTracks(
      artist.id,
      'BR',
      {
        limit,
        offset,
      },
    );
    artist.musics = musicsResponse.tracks.map(SpotifyMusicModelToMusic);

    return {
      artist,
    };
  }

  async playMusic(deviceId: string, musicUri?: string, contextUri?: string) {
    const options: SpotifyApi.PlayParameterObject = {
      device_id: deviceId,
    };
    if (contextUri) {
      options.context_uri = contextUri;
    } else if (musicUri) {
      options.uris = [musicUri];
    }
    await this.spotifyApi.play(options);
  }

  async getMusicPlaying() {
    const getPlayerResponse = await this.spotifyApi.getMyCurrentPlayingTrack();

    if (getPlayerResponse) {
      return SpotifyCurrentPlayToCurrentPlay(getPlayerResponse);
    }
    return newCurrentPlay();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  async previousMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async pauseMusic() {
    await this.spotifyApi.pause();
  }

  async resumeMusic() {
    await this.spotifyApi.play();
  }

  async toggleShuffleOrder(deviceId: string, shuffle: boolean) {
    await this.spotifyApi.setShuffle(shuffle, { device_id: deviceId });
  }

  async toggleRepeatMode(
    deviceId: string,
    repeat: SpotifyApi.PlaybackRepeatState,
  ) {
    await this.spotifyApi.setRepeat(repeat, { device_id: deviceId });
  }

  async getRecentTrack() {
    const response = await this.spotifyApi.getMyRecentlyPlayedTracks({
      limit: 1,
    });
    return response.items[0].track.uri;
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
