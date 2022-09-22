import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeHMS'
})
export class TimeHMSPipe implements PipeTransform {

  transform(value: number ): string {
    return new Date(value*1000).toISOString().slice(11, 19);
  }

}
