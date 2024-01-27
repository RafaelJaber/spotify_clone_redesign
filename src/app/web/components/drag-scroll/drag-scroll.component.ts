import { Component, Input } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { IPlaylistModel } from '@domain/interfaces/IPlaylist.model';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';

@Component({
  selector: 'app-drag-scroll',
  standalone: true,
  imports: [CardItemComponent, DragScrollItemDirective, DragScrollComponent],
  templateUrl: './drag-scroll.component.html',
  styleUrl: './drag-scroll.component.css',
})
export class DragScrollSharedComponent {
  protected isLastItem: boolean = false;
  protected isFirstItem: boolean = false;

  @Input({ required: true })
  cardItens: IPlaylistModel[] | IArtistsModel[] = [];

  protected onIsFirst(attribute: boolean) {
    this.isFirstItem = attribute;
  }

  protected onIsLast(attribute: boolean) {
    this.isLastItem = attribute;
  }
}
