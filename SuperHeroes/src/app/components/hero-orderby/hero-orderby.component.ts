import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-orderby',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-orderby.component.html',
  styleUrl: './hero-orderby.component.css'
})
export class HeroOrderbyComponent {

  @Output() orderSelected: EventEmitter<string> = new EventEmitter();

  getHeroSearch(selection: any) {
      const order = selection.value.order;
      console.log(order);
      this.orderSelected.emit(order);
  }

}
