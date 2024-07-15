import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule
  ]
})
export class ComingsoonPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
