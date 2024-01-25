import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../domain/services/theme.service';
import { Subscription } from 'rxjs';
import { ThemeEnum } from '../../../domain/enums/theme.enum';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private subs: Subscription[] = [];

  protected themeBackground: string = '';

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private init() {
    const sub = this.themeService.theme.subscribe((theme) => {
      switch (theme) {
        case ThemeEnum.DARK:
          this.themeBackground = '/assets/images/bg-login-dark.svg';
          break;
        case ThemeEnum.LIGHT:
          this.themeBackground = '/assets/images/bg-login-light.svg';
          break;
      }
    });
    this.subs.push(sub);
  }
}
