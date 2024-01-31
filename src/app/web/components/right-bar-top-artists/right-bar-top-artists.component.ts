import { Component, inject, OnInit } from '@angular/core';
import { RightBarTopArtistsItemComponent } from '../right-bar-top-artists-item/right-bar-top-artists-item.component';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';
import { SpotifyService } from '@domain/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-bar-top-artists',
  standalone: true,
  imports: [RightBarTopArtistsItemComponent],
  templateUrl: './right-bar-top-artists.component.html',
  styleUrl: './right-bar-top-artists.component.css',
})
export class RightBarTopArtistsComponent implements OnInit {
  private spotifyService = inject(SpotifyService);
  private router = inject(Router);

  protected artists: IArtistsModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  protected async onArtistClick(id: string) {
    await this.router.navigateByUrl(`/player/list/artist/${id}`);
  }

  private init() {
    this.spotifyService.getTopArtists(5).then((artists) => {
      this.artists = artists;
    });
  }
}
