import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-itemperpage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-itemperpage.component.html',
  styleUrl: './hero-itemperpage.component.css'
})
export class HeroItemperpageComponent {

  

  @Output() itemsPerPageSelected: EventEmitter<string> = new EventEmitter();


  getItems(selection: any) {
    const items = selection.value.items;
    console.log(items);
    this.itemsPerPageSelected.emit(items);
  }

}
