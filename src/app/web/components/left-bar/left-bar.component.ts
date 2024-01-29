import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonNavigationComponent } from '../button-navigation/button-navigation.component';
import { NgOptimizedImage } from '@angular/common';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ThemeService } from '@domain/services/theme.service';
import { Subscription } from 'rxjs';
import { ThemeEnum } from '@domain/enums/theme.enum';
import { SpotifyService } from '@domain/services/spotify.service';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [ButtonNavigationComponent, NgOptimizedImage, UserInfoComponent],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css',
})
export class LeftBarComponent implements OnInit, OnDestroy {
  private spotifyService = inject(SpotifyService);
  private themeService = inject(ThemeService);
  private subs: Subscription[] = [];

  protected spotifyLogo = 'assets/images/logo-spotify-light.svg';
  protected playlists: IPlaylistModel[] = [];

  ngOnInit(): void {
    this.init();
    this.getPlaylists();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private init() {
    const sub = this.themeService.theme.subscribe((theme) => {
      switch (theme) {
        case ThemeEnum.DARK:
          this.spotifyLogo = '/assets/images/logo-spotify-dark.svg';
          break;
        case ThemeEnum.LIGHT:
          this.spotifyLogo = '/assets/images/logo-spotify-light.svg';
          break;
      }
    });
    this.subs.push(sub);
  }

  private getPlaylists() {
    this.spotifyService.getPlaylists().then((playlist) => {
      this.playlists = playlist;
    });
  }
}
