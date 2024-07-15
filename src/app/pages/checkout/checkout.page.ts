import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader } from '@ionic/angular/standalone';
import { FormService } from 'src/app/services/form.service';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { ViewWillEnter } from '@ionic/angular';
import { CheckAccessService } from 'src/app/services/check-access.service';
import { CurrencyPipe } from 'src/app/pipes/currency.pipe';
import { StorageService } from 'src/app/services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [ 
    IonHeader,
    CurrencyPipe,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutPage implements ViewWillEnter {
  title: string = 'Checkout';
  selectedSeats: number[] = [];
  location: any;
  cost: number = 0;
  seatPrice: number = 1000;
  movie: any;
  isLoading: boolean = true; // Estado de carga

  constructor(
    private router: Router, 
    private formService: FormService, 
    private movieApiService: CinemaApiService, 
    private checkService: CheckAccessService, 
    private storageService: StorageService
  ) {
    this.calculateCost();
    this.getMovie();
  }

  ionViewWillEnter() {
    this.calculateCost();
  }

  async getMovie() {
    const movieId = await this.storageService.get('movieId');
    console.log(movieId);
    if (movieId) {
      this.movieApiService.getMovie(movieId).subscribe({
        next: (data) => {
          this.movie = data;
          this.isLoading = false; // Finaliza carga al recibir datos
        },
        error: (error) => {
          console.error('Error fetching movie details', error);
          this.isLoading = false; // Finaliza carga en caso de error
        },
        complete: () => {
          console.log('Movie details fetch complete');
          console.log(this.movie);
        }
      });
    } else {
      console.error('No movie ID found in route parameters');
      this.isLoading = false; // Finaliza carga si no hay ID
    }
  }

  private calculateCost() {
    const form = this.formService.getForm();
    this.cost = form.reservedSeats.length * this.seatPrice; 
    console.log(form.reservedSeats.length);
    console.log(this.seatPrice);
    console.log(form);
    console.log(this.cost);
  }

  navigateBack() {
    this.router.navigate(['/user-data']);
    this.checkService.setPreviousUrl('/user-data'); 
  }

  goToInvoice() {
    const form = this.formService.getForm(); // Obtén el formulario aquí
    this.movieApiService.postTicket(form).subscribe({
      next: (response) => {
        console.log('Compra realizada con éxito', response);
        this.formService.resetFormExceptUser();
        console.log(this.formService.getForm());
        this.router.navigate(['/invoice']);
      },
      error: (error) => {
        console.error('Error al realizar la compra', error);
      }
    });
  }

  goToConfirmation() {
    this.router.navigate(['/confirmation']);
  }
}
