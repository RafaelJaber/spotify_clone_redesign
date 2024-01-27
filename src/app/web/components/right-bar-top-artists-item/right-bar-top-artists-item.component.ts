import { Component, Input } from '@angular/core';
import { IArtistsModel } from '@domain/interfaces/IArtists.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-right-bar-top-artists-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './right-bar-top-artists-item.component.html',
  styleUrl: './right-bar-top-artists-item.component.css',
})
export class RightBarTopArtistsItemComponent {
  @Input({ required: true })
  artist!: IArtistsModel;
}
