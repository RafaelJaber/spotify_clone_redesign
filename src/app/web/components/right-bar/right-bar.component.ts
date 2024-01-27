import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@domain/services/theme.service';
import { Subscription } from 'rxjs';
import { ThemeEnum } from '@domain/enums/theme.enum';
import { RightBarTopArtistsComponent } from '../right-bar-top-artists/right-bar-top-artists.component';
import { MiniPlayerComponent } from '../mini-player/mini-player.component';

@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [RightBarTopArtistsComponent, MiniPlayerComponent],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.css',
})
export class RightBarComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private subs: Subscription[] = [];

  protected theme!: ThemeEnum;
  protected readonly ThemeEnum = ThemeEnum;

  ngOnInit(): void {
    this.init();
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  protected setTheme(theme: ThemeEnum) {
    this.themeService.setTheme(theme);
  }

  private init() {
    const sub = this.themeService.theme.subscribe((theme) => {
      this.theme = theme;
    });
    this.subs.push(sub);
  }
}
