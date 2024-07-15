import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LongDatePipe } from 'src/app/pipes/long-date.pipe';

@Component({
  selector: 'app-movie-detail-comingsoon',
  templateUrl: './movie-detail-comingsoon.page.html',
  styleUrls: ['./movie-detail-comingsoon.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LongDatePipe]
})
export class MovieDetailComingsoonPage implements OnInit {
  movie : any;

  constructor(private movieApiService : CinemaApiService, private route : ActivatedRoute) { }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log(movieId)
    if (movieId) {
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
