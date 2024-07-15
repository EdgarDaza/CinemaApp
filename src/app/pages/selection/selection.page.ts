import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonIcon,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  NavController,
  ViewWillEnter
} from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { CinemaApiService } from "../../services/cinema-api.service";
import { FormService } from "../../services/form.service";
import { StorageService } from 'src/app/services/storage.service';
import { CheckAccessService } from 'src/app/services/check-access.service';
import { LongDatePipe } from 'src/app/pipes/long-date.pipe';
import { FormatTimePipe } from 'src/app/pipes/format-time.pipe';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LongDatePipe,
    FormatTimePipe,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonIcon,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectionPage implements ViewWillEnter {
  showtimes: any = [];
  title: string = 'Selection';
  selectedDay: string = '';
  selectedTime: string = '';
  movieId : string | null;
  

  constructor(
    private router: Router,
    private movieApiService: CinemaApiService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formService: FormService,
    private storageService : StorageService,
    private checkAccess : CheckAccessService
  ) {
    addIcons({ arrowBackOutline });
    this.movieId = this.route.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.resetState();
    this.fetchShowtimeHours();
  }

  private resetState() {
    this.showtimes = [];
    this.selectedDay = '';
    this.selectedTime = '';
  }

  private fetchShowtimeHours() {
    console.log(this.movieId);
    if (this.movieId) {
      this.movieApiService.getShowtimeHours(this.movieId).subscribe({
        next: (data) => {
          this.showtimes = data;
          if (this.showtimes.length > 0) {
            this.selectedDay = this.showtimes[0].showtimeDate;
          }
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

  onDaySelected(event: any) {
    this.selectedDay = event.detail.value;
  }

  onTimeSelected(event: any) {
    this.selectedTime = event.detail.value;
  }

  goToSelectSeats(showtimeHour: string) {
    const showtime = this.showtimes.find((s: any) => s.showtimeDate === this.selectedDay);
    console.log(showtimeHour);
    
    if (showtime) {
      const showtimeHourObj = showtime.showtimeHours.find((s: any) => s.showtimeHour === showtimeHour);
      console.log(showtimeHourObj.idShowtimeHour);
      if (showtimeHourObj) {
        this.formService.updateForm({
          showtimeHour: {
            idShowtimeHour: showtimeHourObj.idShowtimeHour,
            showtimeHour: showtimeHour
          }
        });
      this.storageService.set('showtimeHourId', showtimeHourObj.idShowtimeHour);
      this.navCtrl.navigateForward(`/seats/${showtimeHourObj.idShowtimeHour}`);
      } else {
        console.error('Hora seleccionada no encontrada');
      }
    } else {
      console.error('Día seleccionado no encontrado');
    }
  }

  getShowtimeHoursForDay(day: string) {
    const showtime = this.showtimes.find((s: any) => s.showtimeDate === day);
    return showtime ? showtime.showtimeHours : [];
  }

  navigateBack() {
    this.router.navigate([`/movie-detail/${this.movieId}`]);
    this.checkAccess.setPreviousUrl(`/movie-detail/${this.movieId}`);
  }  
}