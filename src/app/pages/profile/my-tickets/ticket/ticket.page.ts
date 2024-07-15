import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
  imports : [
    CommonModule,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonButton,
  ],
  standalone : true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketPage {
  ticketId: string = ''; // Cambiado a string para recibir el ID del ticket como string
  ticketDetails: any;

  constructor(private route: ActivatedRoute, private cinemaApiService: CinemaApiService) {}

  async ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log('ID param from route:', idParam);
      if (idParam) {
        this.ticketId = idParam;
        this.loadTicketDetails(this.ticketId);
      } else {
        console.error('No ticket ID found in route parameters');
      }
    });    
  }

  private loadTicketDetails(ticketId: string) {
    this.cinemaApiService.getTicketById(ticketId).subscribe({
      next: (data) => {
        this.ticketDetails = data;
        console.log('Detalles del boleto:', data);
      },
      error: (error) => {
        console.error('Error al obtener detalles del boleto', error);
      }
    });
  }
}