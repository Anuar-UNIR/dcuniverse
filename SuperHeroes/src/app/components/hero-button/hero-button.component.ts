import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroServiceService } from '../../service/hero-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-button.component.html',
  styleUrl: './hero-button.component.css'
})
export class HeroButtonComponent {

  @Input() miId: number = 0;
  @Input() parent: string = "";

  @Output() heroDeleted = new EventEmitter<number>();

  heroService = inject(HeroServiceService);
  router = inject(Router);
  
  async deleteHero(id: number): Promise<void> {
      let confirmationSweet = Swal.fire({
          title: '¿Seguro?',
          text: '¿Está usted seguro que quiere borrar el usuario?',
          icon: 'question',
          confirmButtonText: 'Aceptar',
          showCancelButton: true
      });
      if ((await confirmationSweet).isConfirmed) {
          let response = await this.heroService.deleteHero(id);
          console.log(response);
          if (!response) {
              Swal.fire({
                  title: 'Borrado',
                  text: 'Se ha borrado correctamente el usuario',
                  icon: 'success'
              })
              if (this.parent == 'view') {
                  this.router.navigate(['/characters']);
              }
              if (this.parent == 'card') {
                  window.location.reload();
              }
          }
      }
  }


}
