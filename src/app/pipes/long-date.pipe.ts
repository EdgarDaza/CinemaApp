import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longDate',
  standalone: true
})
export class LongDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const today = new Date();
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const isToday = (date.getFullYear() === today.getFullYear() && 
                     date.getMonth() === today.getMonth() && 
                     date.getDate() === today.getDate());

    const isTomorrow = (date.getFullYear() === today.getFullYear() && 
                        date.getMonth() === today.getMonth() && 
                        date.getDate() === today.getDate() + 1);
    
    let formattedDate: string;
    if (isToday) {
      formattedDate = `Hoy, ${date.toLocaleDateString('es-ES', options)}`;
    } else if (isTomorrow) {
      formattedDate = `Mañana, ${date.toLocaleDateString('es-ES', options)}`;
    } else {
      formattedDate = date.toLocaleDateString('es-ES', options);
    }
    
    formattedDate = formattedDate.split(',').map(part => {
      return part.trim().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
    }).join(', ');

    return formattedDate;
  }
}
