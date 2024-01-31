import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-banner',
  standalone: true,
  imports: [],
  templateUrl: './featured-banner.component.html',
  styleUrl: './featured-banner.component.css',
})
export class FeaturedBannerComponent {
  @Input()
  imageUrl: string = '';

  @Input()
  title: string = '';

  @Input()
  description: string = '';
}
