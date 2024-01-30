import { Component, Input } from '@angular/core';
import { IMusicModel } from '@domain/interfaces/IMusic.model';
import { IShortArtistsModel } from '@domain/interfaces/IShortArtists.model';

@Component({
  selector: 'app-list-track-table',
  standalone: true,
  imports: [],
  templateUrl: './list-track-table.component.html',
  styleUrl: './list-track-table.component.css',
})
export class ListTrackTableComponent {
  @Input()
  tracks: IMusicModel[] = [];

  protected getArtists(artists: IShortArtistsModel[]) {
    return artists.map((artists) => artists.name).join(', ');
  }
}
