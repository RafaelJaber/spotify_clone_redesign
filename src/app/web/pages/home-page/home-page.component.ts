import { Component, inject, OnInit } from '@angular/core';
import { PlaylistItemComponent } from '@web/components/playlist-item/playlist-item.component';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { CardItemComponent } from '@web/components/card-item/card-item.component';
import { DragScrollSharedComponent } from '@web/components/drag-scroll/drag-scroll.component';
import { DragScrollItemDirective } from 'ngx-drag-scroll';
import { SpotifyService } from '@domain/services/spotify.service';
import { SectionTopPlaylistsComponent } from '@web/components/section-top-playlists/section-top-playlists.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PlaylistItemComponent,
    CardItemComponent,
    DragScrollSharedComponent,
    DragScrollItemDirective,
    SectionTopPlaylistsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private spotifyService = inject(SpotifyService);

  protected featuredPlaylists: IPlaylistModel[] = [];
  protected topListPlaylist: IPlaylistModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.getFeaturedPlaylists();
    this.getTopListPlaylists();
  }

  private getFeaturedPlaylists() {
    this.spotifyService.getPlaylists().then((playlists) => {
      this.featuredPlaylists = playlists;
    });
  }

  private getTopListPlaylists() {
    this.spotifyService.getCategoryPlaylists().then((playlist) => {
      this.topListPlaylist = playlist;
    });
  }
}
