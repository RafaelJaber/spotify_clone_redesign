import { Component, inject, OnInit } from '@angular/core';
import { PlaylistItemComponent } from '@web/components/playlist-item/playlist-item.component';
import { SpotifyService } from '@domain/services/spotify.service';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';

@Component({
  selector: 'app-section-top-playlists',
  standalone: true,
  imports: [PlaylistItemComponent],
  templateUrl: './section-top-playlists.component.html',
  styleUrl: './section-top-playlists.component.css',
})
export class SectionTopPlaylistsComponent implements OnInit {
  private spotifyService = inject(SpotifyService);

  protected playlists: IPlaylistModel[] = [];

  ngOnInit() {
    this.init();
  }

  private init() {
    this.spotifyService.getPlaylists(6).then((playlists) => {
      this.playlists = playlists;
    });
  }
}
