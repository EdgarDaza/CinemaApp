import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { IonHeader } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InvoicePage  {
  data: any = {};
  dataLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private formService: FormService, private cinemaApiService: CinemaApiService) {}


  ionViewWillEnter() {
    this.fetchTicket();
  }

  private fetchTicket() {
    const form = this.formService.getForm().user;
    this.dataLoaded.next(false);
    this.cinemaApiService.getTicket(form).subscribe({
      next: (data) => {
        this.data = data;
        console.log('Fetched data:', data);
        console.log('Showtime hour:', data.showtimeHour);
        console.log('Movie:', data.showtimeHour.showtime.movie);
      },
      error: (error) => {
        console.error('Error fetching ticket', error);
      },
      complete: () => {
        this.dataLoaded.next(true);
      }
    });
  }
  

  goToHome() {
    this.formService.resetForm();
    this.router.navigate(['/home']);
  }
}
