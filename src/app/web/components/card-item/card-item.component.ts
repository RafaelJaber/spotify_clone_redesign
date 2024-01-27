import { Component, Input } from '@angular/core';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { newPlaylist } from '@core/utils/factories';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input({ required: true })
  item: IPlaylistModel = newPlaylist();
}
