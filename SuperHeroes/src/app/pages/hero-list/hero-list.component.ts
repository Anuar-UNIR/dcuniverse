import { Component, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeroServiceService } from '../../service/hero-service.service';
import { Router } from '@angular/router';
import { IHero } from '../../interfaces/ihero';
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";
import { HeroSearchComponent } from "../../components/hero-search/hero-search.component";
import { HeroOrderbyComponent } from "../../components/hero-orderby/hero-orderby.component";
import { HeroItemperpageComponent } from "../../components/hero-itemperpage/hero-itemperpage.component";
import { PowerFilterComponent } from "../../components/power-filter/power-filter.component";


@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [NgxPaginationModule, HeroCardComponent, HeroSearchComponent, HeroOrderbyComponent, HeroItemperpageComponent, PowerFilterComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent {

  heroService = inject(HeroServiceService);
  router = inject(Router);

  heroList: IHero[] = [];

  listaPerPage: IHero[] = [];

  page: number = 1;
  itemsPerPage: number = 4;
  total!: number;

  power!: number;

  constructor() {
  }
  
  ngOnInit() {
    this.getAllHeroes();
    this.getAllHeroesSinPage();
  }

  getAllHeroesSinPage() {
    this.heroService.getAllHeroSinPag().subscribe((response: any) => {
      this.listaPerPage = response;
      this.total = this.listaPerPage.length;
      console.log(this.listaPerPage);
    })
  }
  getAllHeroes() {
    this.heroService.getAllHeroes(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.heroList = response;
      console.log(this.heroList);
    })
  }
  onPageChange(page: number): void {
    this.page = page;
    this.getAllHeroes();
    console.log(this.page);
  }
  getHeroSearched(input: string) {
    if (input.trim() === "") {
      this.router.navigate(['/characters']);
      this.getAllHeroes();
    } else {
      this.heroService.getHeroByName(input).subscribe(response => {
        this.heroList = response;
        console.log(this.heroList);
      })
    }
  }
  getHeroSearchedByPower(input: string) {
    this.power = Number(input);
    if (this.power === 0) {
      this.router.navigate(['/characters']);
      this.getAllHeroes();
    } else {
      this.heroService.getHeroByPower(this.power).subscribe(response => {
        this.heroList = response;
        console.log(this.heroList);
      })
    }
  }
  orderHeroBy(order: string) {
    if (order === "A-Z") {
      this.heroList.sort((a, b) => {
        if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) {
          return -1;
        }
        if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) {
          return 1;
        }
        return 0;
      })
    }
    if (order === "Z-A") {
      this.heroList.sort((a, b) => {
        if (a.fullname.toLowerCase() > b.fullname.toLowerCase()) {
          return -1;
        }
        if (a.fullname.toLowerCase() < b.fullname.toLowerCase()) {
          return 1;
        }
        return 0;
      })
    }
  }

  getItemsPerPageSelected(selection: string){
    this.itemsPerPage = Number(selection);
    this.getAllHeroes();
    console.log(this.itemsPerPage);
}

}
