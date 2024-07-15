import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButton, 
  NavController,
  IonIcon,
  IonRow,
  IonCol,
  IonGrid } from '@ionic/angular/standalone';

@Component({
  selector: 'app-start1',
  templateUrl: './start1.page.html',
  styleUrls: ['./start1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonGrid]
})
export class Start1Page  {

  constructor(private navCtrl: NavController) { }
  goStart2() {
    this.navCtrl.navigateForward("/start2");
  }


}
