import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  NavController,
  IonIcon,
  IonButton,
  IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-my-credit-cards',
  templateUrl: './my-credit-cards.page.html',
  styleUrls: ['./my-credit-cards.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonIcon,
    IonButton,
    IonButtons
  ]
})
export class MyCreditCardsPage {
  title='Credit cards';
  constructor(private navCtrl: NavController) { 
    addIcons({ arrowBackOutline });
  }

  navigateBack() {
    this.navCtrl.navigateBack('profile'); 
  }
}
