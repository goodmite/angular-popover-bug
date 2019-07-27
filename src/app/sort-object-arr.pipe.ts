import {Pipe, PipeTransform} from '@angular/core';
import {SortService} from './sort.service';

@Pipe({
  name: 'sortObjectArr'
})
export class SortObjectArrPipe implements PipeTransform {

  transform(objs: object[], key: string): any {
    return objs.sort(SortService.sortObj(key));
  }

}
