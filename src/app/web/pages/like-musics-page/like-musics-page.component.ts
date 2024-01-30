import { Component, inject, OnInit } from '@angular/core';
import { SectionTopPlaylistsComponent } from '@web/components/section-top-playlists/section-top-playlists.component';
import { ListTrackTableComponent } from '@web/components/list-track-table/list-track-table.component';
import { SpotifyService } from '@domain/services/spotify.service';
import { IMusicModel } from '@domain/interfaces/IMusic.model';
import {
  Paginator,
  PaginatorComponent,
} from '@web/components/paginator/paginator.component';

@Component({
  selector: 'app-like-musics-page',
  standalone: true,
  imports: [
    SectionTopPlaylistsComponent,
    ListTrackTableComponent,
    PaginatorComponent,
  ],
  templateUrl: './like-musics-page.component.html',
  styleUrl: './like-musics-page.component.css',
})
export class LikeMusicsPageComponent implements OnInit {
  private spotifyService = inject(SpotifyService);

  protected musics: IMusicModel[] = [];

  paginator!: Paginator;

  ngOnInit() {
    this.init();
  }

  async onClickedNextPage({ offset }: { offset: number }) {
    await this.getLikedMusics(offset);
  }

  async onClickedPreviousPage({ offset }: { offset: number }) {
    await this.getLikedMusics(offset);
  }

  private init() {
    this.getLikedMusics().then();
  }

  private async getLikedMusics(offset = 0) {
    const response = await this.spotifyService.getLikedMusics(50, offset);
    this.musics = response.musics;
    this.paginator = {
      offset: response.offset + 1,
      totalElements: response.totalItens,
      nextPageUrl:
        typeof response.next == 'string' ? new URL(response.next) : null,
      previousPageUrl:
        typeof response.previous == 'string'
          ? new URL(response.previous)
          : null,
    };
  }
}
