import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FeaturedBannerComponent } from '@web/components/featured-banner/featured-banner.component';
import { ListTrackTableComponent } from '@web/components/list-track-table/list-track-table.component';
import { PaginatorComponent } from '@web/components/paginator/paginator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '@domain/services/spotify.service';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';
import { newPlaylist } from '@core/utils/factories';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';

@Component({
  selector: 'app-track-list-page',
  standalone: true,
  imports: [
    FeaturedBannerComponent,
    ListTrackTableComponent,
    PaginatorComponent,
  ],
  templateUrl: './track-list-page.component.html',
  styleUrl: './track-list-page.component.css',
})
export class TrackListPageComponent implements OnInit, OnDestroy {
  private spotifyService = inject(SpotifyService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private subs: Subscription[] = [];

  protected item: IPlaylistModel | IArtistsModel = newPlaylist();
  protected paginatorVisible: boolean = false;

  ngOnInit() {
    this.item.musics = [];
    this.init();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private init() {
    const sub = this.activatedRoute.paramMap.subscribe(async (params) => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getPageDate(type, id);
    });
    this.subs.push(sub);
  }

  private async getPageDate(type: string | null, id: string | null) {
    if (type == null || id == null) {
      await this.router.navigateByUrl('/player/home');
    } else {
      switch (type) {
        case 'playlist':
          await this.getPlaylistData(id);
          break;
        case 'artist':
          await this.getArtistData(id);
          break;
        default:
          await this.router.navigateByUrl('/player/home');
      }
    }
  }

  private async getPlaylistData(id: string) {
    const response = await this.spotifyService.getPlaylistMusics(id);
    this.item = response.playlist;
  }

  private async getArtistData(id: string) {
    const response = await this.spotifyService.getArtistTrack(id);
    this.item = response.artist;
  }
}
