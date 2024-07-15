import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, 
  IonToolbar,
  IonGrid,
  IonRow,
  NavController,
  IonButton
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-start2',
  templateUrl: './start2.page.html',
  styleUrls: ['./start2.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule,
    IonGrid,
    IonRow,
    IonButton]
})
export class Start2Page  {

  constructor(private navCtrl: NavController) { }
  goStart3() {
    this.navCtrl.navigateForward("/start3");
  }

  goToHome() {
    this.navCtrl.navigateForward("/home")
  }
  

}
