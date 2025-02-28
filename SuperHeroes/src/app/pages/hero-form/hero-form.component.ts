import { Component, inject } from '@angular/core';
import { HeroServiceService } from '../../service/hero-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IHero } from '../../interfaces/ihero';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {

  heroForm: FormGroup;
  tipo: string = "Añadir";

  activatedRoute = inject(ActivatedRoute);
  heroService = inject(HeroServiceService);
  router = inject(Router);

  hide = true;
  hideShow = false;


  constructor() {
    this.heroForm = new FormGroup({
      heroname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      fullname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      image1: new FormControl(null, [Validators.required, Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)]),
      image2: new FormControl(null, [Validators.required, Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)]),
      image3: new FormControl(null, [Validators.required, Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)]),
      gender: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      race: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      alignment: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      intelligence: new FormControl(null, [Validators.required]),
      strength: new FormControl(null, [Validators.required]),
      speed: new FormControl(null, [Validators.required]),
      durability: new FormControl(null, [Validators.required]),
      power: new FormControl(null, [Validators.required]),
      combat: new FormControl(null, [Validators.required]),
    }, []);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        //pedir user por id
        this.tipo = "Actualizar";
        const response = await this.heroService.getHeroById(params.id);

        this.heroForm = new FormGroup({
          id: new FormControl(response.id, []),
          heroname: new FormControl(response.heroname, [Validators.required, Validators.minLength(3)]),
          fullname: new FormControl(response.fullname, [Validators.required, Validators.minLength(3)]),
          image1: new FormControl(response.image1, [Validators.required, Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)]),
          image2: new FormControl(response.image2, [Validators.required, Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)]),
          image3: new FormControl(response.image3, [Validators.required, Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)]),
          gender: new FormControl(response.gender, [Validators.required, Validators.minLength(3)]),
          race: new FormControl(response.race, [Validators.required, Validators.minLength(3)]),
          alignment: new FormControl(response.alignment, [Validators.required, Validators.min(0)]),
          intelligence: new FormControl(response.powerstats.intelligence, [Validators.required]),
          strength: new FormControl(response.powerstats.strength, [Validators.required]),
          speed: new FormControl(response.powerstats.speed, [Validators.required]),
          durability: new FormControl(response.powerstats.durability, [Validators.required]),
          power: new FormControl(response.powerstats.power, [Validators.required]),
          combat: new FormControl(response.powerstats.combat, [Validators.required]),
        }, []);
      }
    });
  }


  async getDataForm() {
    const heroNew: any = this.heroForm.value;
    console.log(heroNew);
    const heroFull: IHero = {
      id: heroNew.id,
      heroname: heroNew.heroname,
      fullname: heroNew.fullname,
      image1: heroNew.image1,
      image2: heroNew.image2,
      image3: heroNew.image3,
      gender: heroNew.gender,
      race: heroNew.race,
      alignment: heroNew.alignment,
      powerstats: {
        intelligence: heroNew.intelligence,
        power: heroNew.power,
        durability: heroNew.durability,
        combat: heroNew.combat,
        speed: heroNew.speed,
        strength: heroNew.strength,
        id: heroNew.id,
        characters: heroNew.characters
      }
    
    }
    
    console.log(this.heroForm.value);
    if (heroFull.heroname != "") {
      if (heroFull.id) {
        //Actualizar
        const response = await this.heroService.update(heroFull);
        if (response.id) {
          Swal.fire({
            title: "Usuario Actualizado",
            text: "El usuario " + response.heroname + " se ha actualizado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
          // alert(`El usuario ${response.first_name} se ha actualizado correctamente`);
          this.router.navigate(['/characters']);
        } else {
          alert("Ha ocurrido un problema con la actualizacion")
        }
      } else {
        //Insertar
        const response = await this.heroService.insert(heroFull);
        if (response.id) {
          Swal.fire({
            title: "Usuario Añadido",
            text: "El usuario se ha añadido correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
          // alert(`El usuario ${response.first_name} se ha insertado correctamente`);
          this.router.navigate(['/users']);
        } else {
          alert("Ha ocurrido un problema con la insercion")
        }
      }
    }
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.heroForm.get(formControlName)?.hasError(validador) &&
      this.heroForm.get(formControlName)?.touched;
  }

}
