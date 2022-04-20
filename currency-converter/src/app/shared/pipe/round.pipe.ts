import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: string | number): number {
    const temp = +value;
    return +temp.toFixed(2);
  }

}
