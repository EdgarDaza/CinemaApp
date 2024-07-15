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
  selector: 'app-start3',
  templateUrl: './start3.page.html',
  styleUrls: ['./start3.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonGrid,
  IonRow,
  IonButton
  ]
})
export class Start3Page  {

  constructor(private navCtrl: NavController) { }
  goStart4() {
    this.navCtrl.navigateForward("/start4");
  }

  goToHome() {
    this.navCtrl.navigateForward("/home")
  }

  ngOnInit() {
  }

}
