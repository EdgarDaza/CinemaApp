import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader } from '@ionic/angular/standalone'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: true,
  imports: [ 
    IonHeader 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfirmationPage{

}
