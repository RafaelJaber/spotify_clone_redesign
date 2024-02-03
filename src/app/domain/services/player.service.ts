import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { newCurrentPlay } from '@core/utils/factories';
import { SpotifyService } from '@domain/services/spotify.service';
import { IPlayerConfigsModel } from '@domain/interfaces/IPlayerConfigs.model';

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
  private playerConfig: WritableSignal<IPlayerConfigsModel> = signal({
    repeat: 'off',
    shuffle: false,
    volume: 1,
  });
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
        volume: this.playerConfig().volume,
      });

      this.spotifyPlayer.addListener('ready', ({ device_id }) => {
        this.deviceIdState.set(device_id);
        this.setCurrentMusic();
      });

      // this.spotifyPlayer.addListener('player_state_changed', () => {
      //   //this.getCurrentMusic();
      // });

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

  getPlayerConfigSignal() {
    return this.playerConfig.asReadonly();
  }

  async handleTogglePlay(musicUri?: string, contentUri?: string) {
    if (this.playerState().isPlaying == null) {
      if (!musicUri && !contentUri) {
        const recentUri = await this.spotifyService.getRecentTrack();
        await this.spotifyService.playMusic(this.deviceIdState(), recentUri);
      } else if (musicUri) {
        await this.spotifyService.playMusic(this.deviceIdState(), musicUri);
      } else if (contentUri) {
        await this.spotifyService.playMusic(
          this.deviceIdState(),
          undefined,
          contentUri,
        );
      }
    } else if (musicUri || contentUri) {
      if (musicUri) {
        await this.spotifyService.playMusic(this.deviceIdState(), musicUri);
      } else {
        await this.spotifyService.playMusic(
          this.deviceIdState(),
          undefined,
          contentUri,
        );
      }
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
    if (currentMusic.music.id != '') {
      currentMusic.music.liked = await this.trackIsLiked(currentMusic.music.id);
    }
    this.playerState.set(currentMusic);
    if (this.playerState().isPlaying) {
      this.timerId = setInterval(async () => {
        await this.getCurrentMusic();
      }, 1000);
    } else {
      this.timerId = setInterval(async () => {
        await this.getCurrentMusic();
      }, 3000);
    }
  }

  async saveTrackFunction(track: string) {
    const trackIsLiked = await this.trackIsLiked(track);
    if (trackIsLiked) {
      await this.spotifyService.removeFromSaveTracks([track]);
    } else {
      await this.spotifyService.addFromSaveTracks([track]);
    }
  }

  async changeVolume(volume: number) {
    this.spotifyPlayer?.setVolume(volume);
    this.playerConfig.update((configs) => {
      return {
        volume,
        shuffle: configs.shuffle,
        repeat: configs.repeat,
      };
    });
  }

  async toggleShuffle() {
    const shuffle = !this.playerConfig().shuffle;
    await this.spotifyService.toggleShuffleOrder(this.deviceIdState(), shuffle);
    this.playerConfig.update((configs) => {
      return {
        shuffle,
        volume: configs.volume,
        repeat: configs.repeat,
      };
    });
  }

  async trackIsLiked(track: string): Promise<boolean> {
    const tracks = [track];
    const response = await this.spotifyService.checkUserSaveTrack(tracks);
    return response[0];
  }

  async repeat() {
    let repeat: 'off' | 'track' = 'off';
    if (this.playerConfig().repeat === 'off') {
      repeat = 'track';
    } else {
      repeat = 'off';
    }
    await this.spotifyService.toggleRepeatMode(this.deviceIdState(), repeat);
    this.playerConfig.update((configs) => {
      return {
        repeat,
        shuffle: configs.shuffle,
        volume: configs.volume,
      };
    });
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
