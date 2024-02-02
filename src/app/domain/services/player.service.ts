import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { newCurrentPlay } from '@core/utils/factories';
import { SpotifyService } from '@domain/services/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private spotifyService = inject(SpotifyService);
  private router = inject(Router);
  private spotifyPlayer: Spotify.Player | null = null;
  private token: string = '';
  private playerState = signal(newCurrentPlay());
  private deviceIdState = signal('');
  private timerId: any = null;

  constructor() {
    this.validateToken().then();
  }

  async initPlayer() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const accessToken = this.token;

      this.spotifyPlayer = new Spotify.Player({
        name: 'Spotify Angular',
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      this.spotifyPlayer.addListener('ready', ({ device_id }) => {
        this.deviceIdState.set(device_id);
        this.setCurrentMusic();
      });

      this.spotifyPlayer.addListener('player_state_changed', () => {
        this.getCurrentMusic();
      });

      this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      this.spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      this.spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      this.spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      return this.spotifyPlayer.connect();
    };
  }

  getPlayerState() {
    return this.playerState.asReadonly();
  }

  async handleTogglePlay() {
    if (this.playerState().isPlaying == null) {
      const recentUri = await this.spotifyService.getRecentTrack();
      await this.spotifyService.playMusic(this.deviceIdState(), recentUri);
    } else if (this.playerState().isPlaying) {
      await this.spotifyService.pauseMusic();
    } else {
      await this.spotifyService.resumeMusic();
    }
    this.setCurrentMusic();
  }

  async handleNextTrack() {
    await this.spotifyService.nextMusic();
    this.setCurrentMusic();
  }

  setCurrentMusic() {
    this.getCurrentMusic().then();
  }

  async handlePreviousTrack() {
    await this.spotifyService.previousMusic();
    this.setCurrentMusic();
  }

  private async getCurrentMusic() {
    clearTimeout(this.timerId);
    const currentMusic = await this.spotifyService.getMusicPlaying();
    this.playerState.set(currentMusic);
    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, 3000);
  }

  private async validateToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      return;
    }
    await this.router.navigate(['/login']);
  }
}