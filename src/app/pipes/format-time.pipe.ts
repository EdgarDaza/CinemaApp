import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    const [hours, minutes] = value.split(':');
    return `${hours}:${minutes}`;
  }
}
