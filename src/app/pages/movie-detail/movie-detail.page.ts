import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, NavController, NavParams, IonCard, IonCardContent, IonCardTitle} from '@ionic/angular/standalone';
import { MoviesApiService } from "../../services/movies-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardTitle]
})
export class MovieDetailPage implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieApiService: MoviesApiService
  ) { }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log(movieId)
    if (movieId) { // Verificar si movieId no es null
      this.movieApiService.getMovie(movieId).subscribe({
        next: (data) => {
          this.movie = data;
        },
        error: (error) => {
          console.error('Error fetching movie details', error);
        },
        complete: () => {
          console.log('Movie details fetch complete');
        }
      });
    } else {
      console.error('No movie ID found in route parameters');
    }
  }
}
