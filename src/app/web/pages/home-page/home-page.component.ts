import { Component, OnInit } from '@angular/core';
import { PlaylistItemComponent } from '../../components/playlist-item/playlist-item.component';
import { IPlaylistModel } from '../../../domain/interfaces/IPlaylist.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PlaylistItemComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  protected playlists: IPlaylistModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  private init() {
    for (let i = 0; i < 6; i++) {
      const prov: IPlaylistModel = {
        id: i.toString(),
        name: 'Playlist ' + i.toString(),
        imageUrl: 'https://github.com.br',
      };
      this.playlists.push(prov);
    }
  }
}
