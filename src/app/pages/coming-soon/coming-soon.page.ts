import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol

} from '@ionic/angular/standalone';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { LongDatePipe } from 'src/app/pipes/long-date.pipe';
import { NavController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    LongDatePipe
  ]
})
export class ComingsoonPage implements OnInit {
  movies : any;

  constructor(private moviesApiService:CinemaApiService, private navCtrl: NavController) { }

  ngOnInit() {
    console.log('Fetching movies from API...');
    this.moviesApiService.getComingSoonMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (error) => {
        console.error('Error fetching movies', error);
      },
      complete: () => {
        console.log('Movies fetch complete');
      }
    });
  }

  goToMovieDetailComingSoon(movieId : number)
  {
    this.navCtrl.navigateForward(`movie-detail-comingsoon/${movieId}`);
  }

}
