import { Component, inject } from '@angular/core';
import { SpotifyService } from '@domain/services/spotify.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  private spotifyService = inject(SpotifyService);
  protected user = this.spotifyService.user;

  async onClickedLogoutButton() {
    await this.spotifyService.logout();
  }
}
