import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeroServiceService } from '../../service/hero-service.service';
import { IHero } from '../../interfaces/ihero';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  heroService = inject(HeroServiceService);
  heroList: IHero[] = [];


  constructor(){}

  ngOnInit(){
      this.getAllheros();
  }

  getAllheros(){
      this.heroService.getAllHeroSinPag().subscribe((response: any) => {
          this.heroList = response;
          // this.total = response.count;
          console.log(this.heroList);
          // console.log(this.total);
      });
  }

}
