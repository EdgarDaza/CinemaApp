import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle,
  IonToolbar, 
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestPage {
  title='Test page';
  constructor(private router: Router) { 
  }
  navigateBack() {
    this.router.navigate(['/profile']);
  }
  goSelection() {
    this.router.navigate(['/selection']);
  }

}
