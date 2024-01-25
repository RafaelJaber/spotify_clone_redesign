import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-navigation',
  standalone: true,
  imports: [],
  templateUrl: './button-navigation.component.html',
  styleUrl: './button-navigation.component.css',
})
export class ButtonNavigationComponent {
  @Input({ required: true })
  text: string = '';
}
