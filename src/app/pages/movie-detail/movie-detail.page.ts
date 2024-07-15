import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonButton,
  NavController,
  IonGrid,
  IonRow,
  IonCol,
  ViewWillEnter
} from '@ionic/angular/standalone';
import { CinemaApiService } from "../../services/cinema-api.service";
import { ActivatedRoute } from "@angular/router";
import { CheckAccessService } from 'src/app/services/check-access.service';
import { LongDatePipe } from 'src/app/pipes/long-date.pipe';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonButton,
    LongDatePipe,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class MovieDetailPage implements ViewWillEnter {
  movie: any = null; // Inicializar como null
  isLoading: boolean = true; // Para gestionar el estado de carga
  errorMessage: string | null = null; // Para gestionar errores
  movieId: string | null;

  constructor(
    private route: ActivatedRoute,
    private movieApiService: CinemaApiService,
    private navCtrl: NavController,
    private accessService: CheckAccessService,
    private storageService : StorageService
  ) {
    this.movieId = this.route.snapshot.paramMap.get('id');
    storageService.set('movieId', this.movieId);
  }

  ionViewWillEnter() {
    this.loadMovieDetails();
  }

  private loadMovieDetails() {
    this.isLoading = true;
    this.errorMessage = null;

    if (this.movieId) {
      this.movieApiService.getMovie(this.movieId).subscribe({
        next: (data) => {
          this.movie = data;
        },
        error: (error) => {
          console.error('Error fetching movie details', error);
          this.errorMessage = 'Error fetching movie details, please try again later.';
        },
        complete: () => {
          this.isLoading = false; // Finaliza carga
        }
      });
    } else {
      console.error('No movie ID found in route parameters');
      this.isLoading = false; // Finaliza carga si no hay ID
    }
  }

  goToShowtimeHours(movieId: number) {
    console.log(movieId);
    this.navCtrl.navigateForward(`selection/${movieId}`);
  }
}