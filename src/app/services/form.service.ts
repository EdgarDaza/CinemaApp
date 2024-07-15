export class GlobalForm {
  user: { firstName: string; lastName: string; email: string } = { firstName: '', lastName: '', email: '' };
  showtimeHour: { idShowtimeHour: number; showtimeHour: string } = { idShowtimeHour: 0, showtimeHour: '' };
  reservedSeats: { seat: { idSeat: number; position: string } }[] = [];
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private globalForm: GlobalForm = new GlobalForm();

  getForm(): GlobalForm {
    return this.globalForm;
  }

  updateForm(data: Partial<GlobalForm>) {
    this.globalForm = { ...this.globalForm, ...data };
  }

  resetForm() {
    this.globalForm = new GlobalForm();
  }

  resetFormExceptUser() {
    this.globalForm.showtimeHour = { idShowtimeHour: 0, showtimeHour: '' };
    this.globalForm.reservedSeats = [];
  }
  
}
