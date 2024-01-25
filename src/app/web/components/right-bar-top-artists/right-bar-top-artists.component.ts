import { Component, OnInit } from '@angular/core';
import { RightBarTopArtistsItemComponent } from '../right-bar-top-artists-item/right-bar-top-artists-item.component';
import { IArtistsModel } from '../../../domain/interfaces/IArtists.model';

@Component({
  selector: 'app-right-bar-top-artists',
  standalone: true,
  imports: [RightBarTopArtistsItemComponent],
  templateUrl: './right-bar-top-artists.component.html',
  styleUrl: './right-bar-top-artists.component.css',
})
export class RightBarTopArtistsComponent implements OnInit {
  protected artists: IArtistsModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  private init() {
    for (let i = 0; i < 5; i++) {
      const prov: IArtistsModel = {
        id: i.toString(),
        name: 'Artista ' + i.toString(),
        imageUrl: 'https://github.com/rafaeljaber.png',
      };
      this.artists.push(prov);
    }
  }
}
