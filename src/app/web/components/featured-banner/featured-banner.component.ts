import { Component, inject, Input } from '@angular/core';
import { PlayerService } from '@domain/services/player.service';

@Component({
  selector: 'app-featured-banner',
  standalone: true,
  imports: [],
  templateUrl: './featured-banner.component.html',
  styleUrl: './featured-banner.component.css',
})
export class FeaturedBannerComponent {
  private playerService = inject(PlayerService);

  @Input()
  imageUrl: string = '';

  @Input()
  title: string = '';

  @Input()
  description: string = '';

  @Input()
  contextUri: string | undefined = '';

  protected async handlePlay() {
    await this.playerService.handleTogglePlay(undefined, this.contextUri);
  }
}
