import { Component, Input } from '@angular/core';
import { IHero } from '../../interfaces/ihero';
import { HeroButtonComponent } from "../hero-button/hero-button.component";

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [HeroButtonComponent],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent {

  @Input() miHero!: IHero;

}
