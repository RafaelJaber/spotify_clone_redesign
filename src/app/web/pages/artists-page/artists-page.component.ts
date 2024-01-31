import { Component } from '@angular/core';
import { FeaturedBannerComponent } from '@web/components/featured-banner/featured-banner.component';
import { ListTrackTableComponent } from '@web/components/list-track-table/list-track-table.component';
import { PaginatorComponent } from '@web/components/paginator/paginator.component';

@Component({
  selector: 'app-artists-page',
  standalone: true,
  imports: [
    FeaturedBannerComponent,
    ListTrackTableComponent,
    PaginatorComponent,
  ],
  templateUrl: './artists-page.component.html',
  styleUrl: './artists-page.component.css',
})
export class ArtistsPageComponent {}
