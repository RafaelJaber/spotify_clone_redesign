import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeEnum } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: BehaviorSubject<ThemeEnum> = new BehaviorSubject<ThemeEnum>(
    ThemeEnum.LIGHT,
  );

  constructor() {}

  setTheme(theme: ThemeEnum) {
    this.theme.next(theme);
  }
}
