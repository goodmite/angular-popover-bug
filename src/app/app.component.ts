import {AfterViewInit, Component, ElementRef, isDevMode, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RoutesRecognized} from '@angular/router';
// import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
// import {IAppState} from './ngxs/app.state';
// import {EventService} from './event.service';
// import {StoreService} from './store.service';

declare var CodeMirror: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loadingRouteConfig;
  // @Select() app$: Observable<IAppState>;
  @ViewChild('carousel') carousel: ElementRef;

  constructor(private router: Router,
              /*private eventService: EventService,*/) {
    // super();
  }

  isFullScreenPreview: boolean;
  enterprise_unique_name: string;
  bot_unique_name: string;
  // progressVal = 0;
  // showProgressbar = false;
  editor: any;
  currentIntervalRef;


  ngOnInit() {

    console.log("app.component.ts");

    // this.serverService.compareDeployDates();//TODO: after refactor

    /*
    let storeSnapshot = this.store.snapshot();
    let autoLogoutTime = storeSnapshot.app.autoLogoutTime;
    if(Date.now() > autoLogoutTime){
      localStorage.clear();
      this.storeService.logout();
      location.reload();
    }
    */

    // /**
    //  * This is required here because if we set backend url in login page then anonymour chat page will be left out
    //  * */
    // if(!isDevMode()){
    //   this.serverService.getNSetConfigData$().subscribe(() => {
    //   });
    // }

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {

        this.isFullScreenPreview = data.state.root.firstChild.data.isFullScreenPreview;
        this.bot_unique_name = data.state.root.firstChild.queryParamMap.get('bot_unique_name');
        this.enterprise_unique_name = data.state.root.firstChild.queryParamMap.get('enterprise_unique_name');
      }
      if (data instanceof RouteConfigLoadStart) {
        /*lazy loading*/
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
    console.log('Testing reload: take1');


  }


  /**
   * initializeProgressBarSubscription
   * if loading = true, slowly increase progressbar
   * if loading = false, finish progressbar in 500ms
   * */


  // test(){
  //   this.serverService.getLinkMetaData();
  // }

}
