import { Component, OnInit } from '@angular/core';
import { PlaylistItemComponent } from '@web/components/playlist-item/playlist-item.component';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { CardItemComponent } from '@web/components/card-item/card-item.component';
import { DragScrollSharedComponent } from '@web/components/drag-scroll/drag-scroll.component';
import { DragScrollItemDirective } from 'ngx-drag-scroll';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PlaylistItemComponent,
    CardItemComponent,
    DragScrollSharedComponent,
    DragScrollItemDirective,
  ],
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
        imageUrl: 'https://github.com/rafaeljaber.png',
      };
      this.playlists.push(prov);
    }
  }
}
