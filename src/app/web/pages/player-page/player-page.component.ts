import { Component } from '@angular/core';
import { LeftBarComponent } from '../../components/left-bar/left-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-player-page',
  standalone: true,
  imports: [LeftBarComponent, RouterOutlet],
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.css',
})
export class PlayerPageComponent {}
