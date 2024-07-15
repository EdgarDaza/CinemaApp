import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.page.html',
  styleUrls: ['./my-tickets.page.scss'],
  imports: [
    CommonModule,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonIcon,
    IonButtons
  ],
  standalone: true,
})
export class MyTicketsPage {
  title = 'Tickets';
  data: any[] = [];
  noUserData: boolean = false;

  constructor(
    private router: Router,
    private cinemaApiService: CinemaApiService,
    private storageService: StorageService,
    private navCtrl: NavController
  ) {}

  async ionViewWillEnter() {
    await this.fetchTickets();
  }

  private async fetchTickets() {
    const userData = await this.storageService.get('user');
    if (!userData || !userData.firstName || !userData.lastName || !userData.email) {
      console.error('Faltan datos del usuario', userData);
      this.noUserData = true;
      return;
    }

    this.cinemaApiService.getTickets(userData).subscribe({
      next: (data) => {
        this.data = data;
        console.log('Fetched data:', data);
      },
      error: (error) => {
        console.error('Error fetching tickets', error);
      }
    });
  }

  navigateToTicket(ticketId: string) {
    console.log('Navigating to ticket with ID:', ticketId);
    this.navCtrl.navigateForward(`/ticket/${ticketId}`);
  }
  

  navigateBack() {
    this.router.navigate(['/profile']);
  }
}
