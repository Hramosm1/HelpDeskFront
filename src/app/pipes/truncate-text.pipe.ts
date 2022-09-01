import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string, len: number): string {
    return text.length > len ? text.slice(0, len) + '...' : text;
  }

}
