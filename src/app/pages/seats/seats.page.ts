import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonProgressBar,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol, NavController, ViewWillEnter
} from '@ionic/angular/standalone';
import { CinemaApiService } from "../../services/cinema-api.service";
import { CharPipe } from 'src/app/pipes/char.pipe';
import { BehaviorSubject } from 'rxjs';
import { FormService } from "../../services/form.service";
import { StorageService } from 'src/app/services/storage.service';
import { CheckAccessService } from 'src/app/services/check-access.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.page.html',
  styleUrls: ['./seats.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    CommonModule,
    IonProgressBar,
    IonButtons,
    IonIcon,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    CharPipe
  ]
})
export class SeatsPage implements ViewWillEnter {
  title: string = 'Seats';
  showtimeHourId: string = '';
  occupiedSeats: any;
  selectedSeats: any[] = [];
  movieId: string | null = null;

  private dataLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router, 
    private navCtrl: NavController, 
    private movieApiService: CinemaApiService, 
    private el: ElementRef, 
    private renderer: Renderer2, 
    private formService: FormService, 
    private route: ActivatedRoute,
    private storageService : StorageService,
    private checkService :CheckAccessService
  ) {
    this.loadShowtimeHourId();
  }

  async loadShowtimeHourId() {
    const id = await this.storageService.get('showtimeHourId');
    this.showtimeHourId = id ?? ''; 
  }

  ionViewWillEnter() {
    this.storageService.get('movieId').then((id) => {
      this.movieId = id;
    });
    this.fetchOccupiedSeats();
  }
  

  ngAfterViewInit() {
    this.dataLoaded.subscribe((isLoaded) => {
      if (isLoaded) {
        this.disableOccupiedSeats();
      }
    });
  }

  private resetSelectedSeats() {
    console.log("Reseteando");
    this.selectedSeats = [];
  
    const buttons = this.el.nativeElement.querySelectorAll('.div__container-buttons ion-button');
    buttons.forEach((button: HTMLElement) => {
      this.renderer.removeClass(button, 'selected');
    });
  }

  private fetchOccupiedSeats() {
    console.log("Obteniendo asientos ocupados");
    this.showtimeHourId = this.route.snapshot.paramMap.get('showtimeHourId') ?? ''; // Asigna una cadena vacía si es null
    console.log("showtimeHourId:", this.showtimeHourId);
    if (this.showtimeHourId) {
      this.movieApiService.getSeatsFromShowtimeHours(this.showtimeHourId).subscribe({
        next: (data) => {
          console.log("Datos recibidos:", data);
          this.occupiedSeats = data;
        },
        error: (error) => {
          console.error('Error fetching seats', error);
        },
        complete: () => {
          console.log('Seats fetch complete');
          console.log(this.occupiedSeats);
          this.dataLoaded.next(true);
        }
      });
    } else {
      console.error('No showtimeHourId found in route parameters');
    }
  }

  disableOccupiedSeats() {
    console.log("Desactivando puestos");
    this.occupiedSeats.forEach((seat: { position: string }) => {
      const button = this.el.nativeElement.querySelector(`.${seat.position}`);
      if (button) {
        this.renderer.setAttribute(button, 'disabled', 'true');
      }
    });
  }

  toggleSeatSelection(seat: { idSeat: number, position: string }) {
    const index = this.selectedSeats.findIndex(s => s.idSeat === seat.idSeat);
    const button = this.el.nativeElement.querySelector(`.${seat.position}`);
    console.log("Seleccionando");
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      if (button) {
        this.renderer.removeClass(button, 'selected');
      }
    } else {
      this.selectedSeats.push(seat);
      if (button) {
        this.renderer.addClass(button, 'selected');
      }
    }
    console.log(this.selectedSeats);
  }

  getPosition(rowIndex: number, colIndex: number): string {
    const rowChar = String.fromCharCode('A'.charCodeAt(0) + rowIndex);
    return `${rowChar}${colIndex + 1}`;
  }

  goToUserData(showtimeHourId: string) {
    this.formService.updateForm({
      reservedSeats: this.selectedSeats.map(seat => ({ seat }))
    });
    console.log(showtimeHourId);
    this.navCtrl.navigateForward('/user-data');
  }

  navigateBack() {
    if (this.movieId) {
      this.router.navigate([`/selection/${this.movieId}`]);
    } else {
      this.router.navigate(['/home']);
    }
    this.checkService.setPreviousUrl(`/selection/${this.movieId}`); // Almacena la URL anterior
  }
  
}