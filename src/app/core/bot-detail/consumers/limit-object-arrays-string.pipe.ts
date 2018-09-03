import { Pipe, PipeTransform } from '@angular/core';
import {IConsumerResults} from '../../../../interfaces/consumer';

@Pipe({
  name: 'limitObjectArraysString'
})
export class LimitObjectArraysStringPipe implements PipeTransform {

  transform(consumerResults: IConsumerResults[], args?: any): any {
    if(!consumerResults) return;
    consumerResults = JSON.parse(JSON.stringify(consumerResults));
    debugger;
    let x =consumerResults.map((consumer)=>{
      for(let key in consumer){
        if(consumer[key] && consumer[key].length &&  consumer[key].length>20)
        consumer[key] = consumer[key].substring(1,15)+'...'
      }
      return consumer;
    });
    return x;
  }

}
