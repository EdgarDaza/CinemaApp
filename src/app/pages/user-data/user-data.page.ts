import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { FormService } from 'src/app/services/form.service'; 
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonIcon,
  IonItem,
  IonInput,
  ViewWillEnter
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButtons,
    IonButton,
    IonList,
    IonIcon,
    IonItem,
    IonInput
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserDataPage implements ViewWillEnter {
  title: string = 'User data';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  showtimeHourId: number;
  saveData: boolean = false;

  constructor(
    private router: Router, 
    private storageService: StorageService, 
    private formService: FormService
  ) 
  {
    this.showtimeHourId = this.formService.getForm().showtimeHour.idShowtimeHour;
  }

  async ionViewWillEnter() {
    const savedUser = await this.storageService.get('user');
    const saveDataDecision = await this.storageService.get('saveData');

    if (saveDataDecision) {
      this.saveData = saveDataDecision;
      if (this.saveData && savedUser) {
        this.firstName = savedUser.firstName;
        this.lastName = savedUser.lastName;
        this.email = savedUser.email;
      }
    } else {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
    }
  }
  
  async onToggleSaveData(event: any) {
    this.saveData = event.detail.checked;
    console.log('Toggle Save Data:', this.saveData);

    if (this.saveData) {
      const form = this.formService.getForm();
      console.log(form);
      if (form.user.firstName || form.user.lastName || form.user.email) {
        console.log("Datos del usuario guardados", form.user);
        await this.storageService.set('user', form.user);
      }
      await this.storageService.set('saveData', true);
    } else {
      await this.storageService.remove('user');
      await this.storageService.set('saveData', false);
    }
  }

  async goToCheckout() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
    console.log(userData);
    
    if (this.saveData) {
      console.log("Datos del usuario cargados");
      await this.storageService.set('user', userData);
    }

    this.formService.updateForm({ user: userData });
    console.log(this.showtimeHourId);
    this.router.navigate(['/checkout']);
  }

  navigateBack() {
    
    console.log(this.showtimeHourId);
    if (this.showtimeHourId) {
      this.router.navigate([`/seats/${this.showtimeHourId}`]);
    } else {
      this.router.navigate(['/home']);
    }
  }
  
}
