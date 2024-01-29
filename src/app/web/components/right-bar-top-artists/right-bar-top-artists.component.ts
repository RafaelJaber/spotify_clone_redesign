import { Component, inject, OnInit } from '@angular/core';
import { RightBarTopArtistsItemComponent } from '../right-bar-top-artists-item/right-bar-top-artists-item.component';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';
import { SpotifyService } from '@domain/services/spotify.service';

@Component({
  selector: 'app-right-bar-top-artists',
  standalone: true,
  imports: [RightBarTopArtistsItemComponent],
  templateUrl: './right-bar-top-artists.component.html',
  styleUrl: './right-bar-top-artists.component.css',
})
export class RightBarTopArtistsComponent implements OnInit {
  private spotifyService = inject(SpotifyService);

  protected artists: IArtistsModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.spotifyService.getTopArtists(5).then((artists) => {
      this.artists = artists;
    });
  }
}
