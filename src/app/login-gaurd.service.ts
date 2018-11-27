
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {IAuthState} from './auth/ngxs/auth.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class LoginGaurdService {

  constructor(private router: Router) {
  }

  @Select() loggeduser$: Observable<IAuthState>;

  canActivate() {

    return this.loggeduser$.pipe(map((value: IAuthState) => {
      if (value.user == null) {
        return true;
      } else {
        this.router.navigate(['.']);
        return false;
      }
    }));
  }
}
