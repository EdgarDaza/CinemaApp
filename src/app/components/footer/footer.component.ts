import { Component, OnInit } from '@angular/core';

import { 
  IonTabs,
  IonTabBar, 
  IonTabButton,
  IonIcon, 
  IonRouterLink
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  calendarOutline,
  // added in PascalCase
  homeOutline, 
  personOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    IonTabs, 
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonRouterLink
  ]
})
export class FooterComponent  implements OnInit {

  constructor() { 
    addIcons({ homeOutline, calendarOutline, personOutline});

  }

  ngOnInit() {}

}


