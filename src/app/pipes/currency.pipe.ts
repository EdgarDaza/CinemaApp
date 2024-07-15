import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
}
