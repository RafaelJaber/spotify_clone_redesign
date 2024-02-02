import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { newPlaylist } from '@core/utils/factories';
import { PlayerService } from '@domain/services/player.service';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  imports: [],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.css',
})
export class PlaylistItemComponent {
  private playerService = inject(PlayerService);

  protected currentlySate = this.playerService.getPlayerState();

  @Input({ transform: booleanAttribute })
  isPlaying: boolean = false;

  @Input()
  playlist: IPlaylistModel = newPlaylist();

  async onCLickToPlay(uri: string | undefined) {
    await this.playerService.handleTogglePlay(undefined, uri);
  }
}
