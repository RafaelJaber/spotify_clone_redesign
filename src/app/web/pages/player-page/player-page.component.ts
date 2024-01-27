import { Component } from '@angular/core';
import { LeftBarComponent } from '@web/components/left-bar/left-bar.component';
import { RouterOutlet } from '@angular/router';
import { RightBarComponent } from '@web/components/right-bar/right-bar.component';

@Component({
  selector: 'app-player-page',
  standalone: true,
  imports: [LeftBarComponent, RouterOutlet, RightBarComponent],
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.css',
})
export class PlayerPageComponent {}
