import { 
  CUSTOM_ELEMENTS_SCHEMA, 
  Component, 
  Input 
} from '@angular/core';
import { 
  CommonModule, 
  Location 
} from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton, 
  NavController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  @Input() title: string = ' ';

  constructor(private location: Location) {
    addIcons ({ arrowBackOutline })
  }

  navigateBack() {
      this.location.back();
  }
}
