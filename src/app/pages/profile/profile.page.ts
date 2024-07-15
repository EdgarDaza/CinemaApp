import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonIcon,
  NavController
} from '@ionic/angular/standalone';
import { cardOutline, ticketOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton,
    IonIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePage {
  title: string = 'Profile';
  constructor(private navCtrl: NavController) { 
  // constructor(private navController: NavController) { 
    addIcons({ ticketOutline, cardOutline});
  }

  goMyTickets() {
    this.navCtrl.navigateForward("/my-tickets");
  }

  goMyCreditCards() {
    this.navCtrl.navigateForward("/my-credit-cards");
  }

  goAboutUs() {
    this.navCtrl.navigateForward("/about-us");
  }

  goTest() {
    this.navCtrl.navigateForward("/test");
  }

  // constructor(private router: Router) {
  //   addIcons({ ticketOutline, cardOutline});
  // }

  // redirectToPage(pageUrl: string) {
  //   this.router.navigateByUrl(pageUrl);
  // }

  // redirectToPage(page: string) {
  //   this.navController.navigateForward(page);
  // }
}