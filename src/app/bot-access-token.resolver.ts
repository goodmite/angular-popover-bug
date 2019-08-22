import {Injectable} from '@angular/core';

import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {LoadJsService} from './core/load-js.service';
import {ServerService} from './server.service';

@Injectable()
export class BotAccessTokenResolver implements Resolve<Observable<any>> {
  constructor(private serverService: ServerService) {
  }

  resolve() {

    if (!ServerService.idTokenMap) {
      return this.serverService.getNSetBotList(false, true);
    }
    return of(1);
  }
}
