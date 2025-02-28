import { Component, EventEmitter, inject, Output } from '@angular/core';
import { HeroServiceService } from '../../service/hero-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {

  searchForm: any;
  searchInput = "";
  resetIsOn: boolean = false;

  @Output() heroSearched: EventEmitter<string> = new EventEmitter();

  heroService = inject(HeroServiceService);

  getHeroSearch(form: any) {
      const buscador = form.value.input;
      console.log(buscador);
      this.heroSearched.emit(buscador);
  }

}
