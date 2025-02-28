import { Component, inject } from '@angular/core';
import { IHero } from '../../interfaces/ihero';
import { ActivatedRoute } from '@angular/router';
import { HeroServiceService } from '../../service/hero-service.service';
import { HeroButtonComponent } from "../../components/hero-button/hero-button.component";

@Component({
  selector: 'app-hero-view',
  standalone: true,
  imports: [HeroButtonComponent],
  templateUrl: './hero-view.component.html',
  styleUrl: './hero-view.component.css'
})
export class HeroViewComponent {

  activatedRoute = inject(ActivatedRoute);
  heroService = inject(HeroServiceService);

  miHero!: IHero;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params: any) => {
        let id: number = params.id;

        try {
            this.miHero = await this.heroService.getHeroById(id);
            console.log(this.miHero);
        } catch (err) {
            console.log("Error al llamar a la API: " + err);
        }
    });
}

}
