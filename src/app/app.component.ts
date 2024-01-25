import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './domain/services/theme.service';
import { Subscription } from 'rxjs';
import { ThemeEnum } from './domain/enums/theme.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private init() {
    const isDarkTheme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkTheme) {
      this.themeService.setTheme(ThemeEnum.DARK);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT;
        this.themeService.setTheme(newColorScheme);
      });

    this.getTheme();
  }

  private getTheme() {
    const sub = this.themeService.theme.subscribe((theme) => {
      switch (theme) {
        case ThemeEnum.DARK:
          document.documentElement.classList.add('dark');
          break;
        case ThemeEnum.LIGHT:
          document.documentElement.classList.remove('dark');
          break;
      }
    });
    this.subs.push(sub);
  }
}
