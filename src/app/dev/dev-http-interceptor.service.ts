import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError as _throw} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {AddApi} from './ngxs/dev.actions';

@Injectable()
export class DevHttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let headerObj: any = {};
    const url = new URL(request.url);
    const random = Date.now();
    url.searchParams.set('sandeep_test_id', random.toString());
    const newUrl = {url: url.href};
    const dupReq = request.clone(newUrl);

    headerObj = this.getHeadersObj(request.headers);

    this.store.dispatch(new AddApi({
      api: {
        id: random,
        headers: headerObj,
        body: typeof request.body !== 'object' ? JSON.parse(request.body) : request.body,
        url: request.url,
        method: <any>request.method,
      }
    }));

    return next.handle(dupReq).pipe(tap(evt => {
      console.log('http interceptor');
      if (evt instanceof HttpResponse) {
        this.store.dispatch(new AddApi({
          api: {
            id: random,
            response: typeof evt.body !== 'object' ? JSON.parse(evt.body) : evt.body,
            response_headers: this.getHeadersObj(evt.headers),
            response_code: evt.status
          }
        }));
      }
    }), catchError((err, caught) => {
      this.store.dispatch(new AddApi({
        api: {
          id: random,
          response_code: err.status,
        }
      }));
      return _throw(err);
    }));
  }

  getHeadersObj(httpHeader: HttpHeaders) {
    const headersArr = (<any>httpHeader).lazyUpdate;
    let headerObj = {};
    if (headersArr) {
      headerObj = headersArr.reduce((total, current) => {
        if (current.name) {
          return {
            ...total,
            [current.name]: current.value
          };
        }
      }, {});
    }
    return headerObj;
  }
}


