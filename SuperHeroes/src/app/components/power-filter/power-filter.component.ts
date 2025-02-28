import { Component, EventEmitter, inject, Output } from '@angular/core';
import { HeroServiceService } from '../../service/hero-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-power-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './power-filter.component.html',
  styleUrl: './power-filter.component.css'
})
export class PowerFilterComponent {

    searchForm: any;
    searchInput = 0;
    resetIsOn: boolean = false;
  
    @Output() heroSearched: EventEmitter<string> = new EventEmitter();
  
    heroService = inject(HeroServiceService);
  
    getHeroSearch(form: any) {
        const buscador = form.value.input;
        console.log(buscador);
        this.heroSearched.emit(buscador);
    }

}
