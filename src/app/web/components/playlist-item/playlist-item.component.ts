import { booleanAttribute, Component, Input } from '@angular/core';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { newPlaylist } from '@core/utils/factories';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  imports: [],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.css',
})
export class PlaylistItemComponent {
  @Input({ transform: booleanAttribute })
  isPlaying: boolean = false;

  @Input()
  playlist: IPlaylistModel = newPlaylist();
}
