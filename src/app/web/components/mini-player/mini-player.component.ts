import { Component, inject, OnInit } from '@angular/core';
import { PlayerService } from '@domain/services/player.service';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [],
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.css',
})
export class MiniPlayerComponent implements OnInit {
  private playerService = inject(PlayerService);

  protected playerStateSignal = this.playerService.getPlayerState();

  ngOnInit() {
    this.playerService.initPlayer().then();
  }

  async onTogglePlay() {
    await this.playerService.handleTogglePlay();
  }

  async onNextClick() {
    await this.playerService.handleNextTrack();
  }

  async onPreviousClick() {
    await this.playerService.handlePreviousTrack();
  }
}
