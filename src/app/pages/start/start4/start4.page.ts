import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonGrid,
  IonRow,
  NavController,
  IonButton
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-start4',
  templateUrl: './start4.page.html',
  styleUrls: ['./start4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonGrid,
  IonRow,
  IonButton
  ]
})
export class Start4Page  {

  constructor(private navCtrl: NavController) { }
  
  goToHome() {
    this.navCtrl.navigateForward("/home")
  }


  ngOnInit() {
  }

}
