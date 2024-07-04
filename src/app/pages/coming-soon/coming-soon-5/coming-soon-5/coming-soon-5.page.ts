import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-coming-soon-5',
  templateUrl: './coming-soon-5.page.html',
  styleUrls: ['./coming-soon-5.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ComingSoon5Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
