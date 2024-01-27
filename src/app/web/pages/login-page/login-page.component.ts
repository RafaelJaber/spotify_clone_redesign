import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@domain/services/theme.service';
import { Subscription } from 'rxjs';
import { ThemeEnum } from '@domain/enums/theme.enum';
import { NgOptimizedImage } from '@angular/common';
import { SpotifyService } from '@domain/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private spotifyService = inject(SpotifyService);
  private router = inject(Router);
  private subs: Subscription[] = [];

  protected themeBackground: string = '';
  protected logoSpotify: string = '';
  protected isLoading: boolean = false;

  ngOnInit(): void {
    this.init()
      .then(() => {
        this.isLoading = true;
        this.router.navigate(['/player']).then();
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private async init() {
    await this.verifySpotifyToken();
    const sub = this.themeService.theme.subscribe((theme) => {
      switch (theme) {
        case ThemeEnum.DARK:
          this.themeBackground = '/assets/images/bg-login-dark.svg';
          this.logoSpotify = '/assets/images/logo-spotify-dark.svg';
          break;
        case ThemeEnum.LIGHT:
          this.themeBackground = '/assets/images/bg-login-light.svg';
          this.logoSpotify = '/assets/images/logo-spotify-light.svg';
          break;
      }
    });
    this.subs.push(sub);
  }

  protected onLoginButtonClicked() {
    this.isLoading = true;
    window.location.href = this.spotifyService.getLoginUrl();
  }

  private async verifySpotifyToken() {
    const token = this.spotifyService.getTokenUrlCallback();
    if (token != '') {
      this.spotifyService.setAccessToken(token);
    }
  }
}
