import { Pipe, PipeTransform } from '@angular/core';
import {OscarItem} from '../../models/oscar/oscar-item';

@Pipe({
  name: 'itemDetail'
})
export class ItemDetailPipe implements PipeTransform {

  transform(value: OscarItem, args?: any): string {
    return ``;
  }

}
