import { Component, inject, Input } from '@angular/core';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { newPlaylist } from '@core/utils/factories';
import { PlayerService } from '@domain/services/player.service';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  private playerService = inject(PlayerService);

  protected currentlySate = this.playerService.getPlayerState();

  @Input({ required: true })
  item: IPlaylistModel = newPlaylist();

  async onCLickToPlay(uri: string | undefined) {
    await this.playerService.handleTogglePlay(undefined, uri);
  }
}
