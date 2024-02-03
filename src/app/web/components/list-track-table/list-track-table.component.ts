import { Component, inject, Input } from '@angular/core';
import { IMusicModel } from '@domain/interfaces/IMusic.model';
import { IShortArtistsModel } from '@domain/interfaces/IShortArtists.model';
import { PlayerService } from '@domain/services/player.service';

@Component({
  selector: 'app-list-track-table',
  standalone: true,
  imports: [],
  templateUrl: './list-track-table.component.html',
  styleUrl: './list-track-table.component.css',
})
export class ListTrackTableComponent {
  private playerService = inject(PlayerService);

  protected playerState = this.playerService.getPlayerState();

  @Input()
  tracks: IMusicModel[] = [];

  protected getArtists(artists: IShortArtistsModel[]) {
    return artists.map((artists) => artists.name).join(', ');
  }

  protected async playTrack(trackUri: string | null) {
    if (trackUri) {
      await this.playerService.handleTogglePlay(trackUri);
    }
  }
}
