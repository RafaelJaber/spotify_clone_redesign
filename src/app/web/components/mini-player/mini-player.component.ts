import { Component, inject, OnInit } from '@angular/core';
import { PlayerService } from '@domain/services/player.service';
import { addMilliseconds, format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.css',
})
export class MiniPlayerComponent implements OnInit {
  private playerService = inject(PlayerService);

  protected playerStateSignal = this.playerService.getPlayerState();
  protected playerConfigSignal = this.playerService.getPlayerConfigSignal();
  ngOnInit() {
    this.playerService.initPlayer().then();
  }

  protected converterMsToMin(ms: number | undefined | null) {
    if (ms == null || !ms) return '0:00';
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  }

  protected getProgress(): string {
    const duration = this.playerStateSignal().music.timeInMilliseconds;
    const progress = this.playerStateSignal().progressMilliseconds;

    if (!duration) return '100%';
    if (!progress) return '100%';

    return (progress / duration) * 100 + '%';
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

  async onChangeVolume(event: any) {
    const volume = event.target.value / 100;
    await this.playerService.changeVolume(volume);
  }

  async onShuffleClick() {
    await this.playerService.toggleShuffle();
  }

  async onClickLike(trackId: string) {
    await this.playerService.saveTrackFunction(trackId);
  }

  async repeatClick() {
    await this.playerService.repeat();
  }
}
