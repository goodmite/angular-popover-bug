import {Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {ServerService} from '../../server.service';
import {ConstantsService} from '../../constants.service';
import {IUser} from '../../core/interfaces/user';
import {Store} from '@ngxs/store';
import {IHeaderData} from '../../../interfaces/header-data';
import {ActivatedRoute, Router} from '@angular/router';
import {IEnterpriseProfileInfo} from '../../../interfaces/enterprise-profile';
import {
  ResetEnterpriseUsersAction,
  SetEnterpriseInfoAction
} from '../../core/enterpriseprofile/ngxs/enterpriseprofile.action';
import {ResetAppState} from '../../ngxs/app.action';
import {ResetAuthToDefaultState, SetUser} from '../ngxs/auth.action';
import {NgForm} from '@angular/forms';
import {MessageDisplayBase} from './messageDisplayBase';
import {forkJoin, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResetBotListAction} from '../../core/view-bots/ngxs/view-bot.action';
import {ResetBuildBotToDefault} from '../../core/buildbot/ngxs/buildbot.action';
import {ResetAnalytics2GraphData, ResetAnalytics2HeaderData} from '../../core/analysis2/ngxs/analysis.action';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {PermissionService} from '../../permission.service';
import {tap} from 'rxjs/internal/operators';
import {ENgxsStogareKey, ERoleName} from '../../typings/enum';
import {MyToasterService} from '../../my-toaster.service';
import {LoggingService} from '../../logging.service';
import {LoadJsService} from '../../core/load-js.service';

enum ELoginPanels {
  set = 'set',
  reset = 'reset',
  login = 'login',
  'password_reset_notify' = 'password-reset-notify',
  'email_reset_link_notify' = 'email-reset-link-notify',
  'enterprise_list_display' = 'enterprise-list-display',
  'reset-via-email' = 'reset-via-email'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends MessageDisplayBase implements OnInit, AfterViewInit {
  connect_redirect_time = 3;
  myELoginPanels = ELoginPanels;
  panelActive: ELoginPanels = ELoginPanels.login;
  showConnectLoginScreen = false;
  disabeLoginButton = false;
  changePasswordToken;
  changePasswordExpireTime;
  userValue: IUser;
  loading = false;
  headerData: IHeaderData;
  enterpriseList: any[];
  userData: IUser;
  searchEnterprise: string;
  infoPageData = [
    {
      img: 'assets/img/orchestrate.svg',
      title: 'Orchestrate',
      description: 'Route the flow based on user’s need by orchestrating multiple bots using a single bot'
    },
    {
      img: 'assets/img/integrate.svg',
      title: 'Integrate',
      description: 'Deploy your bot across social, voice and live channels with one-click'
    },
    {
      img: 'assets/img/facilitate.svg',
      title: 'Facilitate',
      description: 'Based on where the user is within a flow, trigger actions to execute or handover to agents seamlessly'
    },
  ];

  constructor(
    private serverService: ServerService,
    private permissionService: PermissionService,
    private constantsService: ConstantsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private myToasterService: MyToasterService,
    private store: Store) {
    super();
  }

  loginEmails = [];
  isConfigDataSet = false;
  @ViewChild('loginForm') loginForm: NgForm;
  @ViewChild('emailForPasswordResetForm') emailForPasswordResetForm: NgForm;
  @ViewChild('resetPasswordForm') r: NgForm;
  gotUserData$ = new EventEmitter();
  showCustomEmails = false;
  timestamp = new Date();
  accesstoken;
  domainname;

  ngOnInit() {
    this.accesstoken = (window as any).accesstoken;
    this.domainname = (window as any).domainname;
    this.showConnectLoginScreen = this.accesstoken && this.domainname || this.activatedRoute.snapshot.queryParams.source === 'connect';
    if (this.accesstoken && this.domainname) {
      (window as any).accesstoken = '';
      this.router.navigate(['/auth/login']);
      this.loginSubmitHandler({accesstoken: this.accesstoken, domainname: this.domainname});
    }
    try {
      /*replace with plateform.roomId*/
      // localStorage.setItem(ENgxsStogareKey.IMI_BOT_STORAGE_KEY, null);

    } catch (e) {
      console.log(e);
    }
    let userValue = null;

    this.showCustomEmails = !!this.activatedRoute.snapshot.queryParamMap.get('burl');
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    const action = this.activatedRoute.snapshot.queryParamMap.get('action');
    if (token && (action === ELoginPanels.reset || action === ELoginPanels.set)) {
      this.panelActive = action;
    }
    this.changePasswordExpireTime = this.activatedRoute.snapshot.queryParamMap.get('timestamp');

    this.gotUserData$.pipe(
      map((value: IUser) => {
        this.userValue = userValue = value;
        ServerService.setCookie('auth-token', value.auth_token);
        ServerService.setCookie('user-access-token', value.user_access_token);
        console.log('AUTH_TOKEN', ServerService.AUTH_TOKEN);
        console.log('USER_ACCESS_TOKEN', ServerService.USER_ACCESS_TOKEN);
        console.log('document.cookie', document.cookie);
        this.permissionService.loggedUser = this.userValue;
      }),
      switchMap(() => {
        return this.serverService.getNSetMasterPermissionsList();
      }),
      switchMap(() => {
        this.flashInfoMessage('Fetching configurations', 10000);

        return forkJoin([
            // this.serverService.getNSetMasterPermissionsList(),
            this.serverService.getNSetIntegrationList(),
            this.serverService.getNSetPipelineModuleV2(),
            this.serverService.getNSetBotLanguages(),
            // this.serverService.getNSetRoleInfo()
          ]
        );
      }),
      switchMap(() => {
        const enterpriseProfileUrl = this.constantsService.getEnterpriseUrl(userValue.enterprise_id);
        return this.serverService.makeGetReq<IEnterpriseProfileInfo>({url: enterpriseProfileUrl});
      }),
      switchMap((value: IEnterpriseProfileInfo) => {

        if (value) {
          return this.store.dispatch([
            new SetEnterpriseInfoAction({enterpriseInfo: value})
          ]).pipe(tap(() => {
            return this.serverService.getNSetBotList();
          }));
        } else {
          return this.serverService.getNSetBotList();
        }
      }),
      switchMap(() => {
        // document.cookie = `user-access-token-test=${this.userData.user_access_token}`;
        // document.cookie = `auth-token=${this.userData.auth_token};`;
        // document.cookie = `user-access-token=${this.userData.user_access_token}`;
        // ServerService.setCookie('user-access-token-test', this.userData.user_access_token);
        this.userValue = {
          ...this.userValue,
          socket_key: Date.now().toString()
        };
        return this.store.dispatch([
          new SetUser({user: this.userValue, is_loggedIn: true}),
        ]);
      }),
      switchMap(() => {
        this.flashInfoMessage('Loading your dashboard', 10000);
        this.loading = false;
        if (userValue.role.name === ERoleName.Analyst) {
          this.router.navigate(['/core/analytics2/overview']);
          return of();
        }

        // if (userValue.role.name === ERoleName.Analyst) {
        //   this.router.navigate(['/core/analytics2/volume']);
        // } else {
        //   this.router.navigate(['/']);
        // }

        return of(this.router.navigate(['/']));
      }),
      catchError((e, x) => {
        LoggingService.error(e);
        this.loginFailedHandler();
        return x;
      })
    )
      .subscribe(() => {
      });
    //
  }

  sendEmailForReset() {
    const sendEmailUrl = this.constantsService.sendEmailUrl();
    let body;
    if (this.emailForPasswordResetForm.valid) {
      body = this.emailForPasswordResetForm.value;
    } else {
      this.flashErrorMessage('Details not valid');
      return;
    }
    this.serverService.makePostReq<IUser>({url: sendEmailUrl, body})
      .subscribe(() => {
        this.panelActive = ELoginPanels.email_reset_link_notify;
      });
  }

  resetPassword() {
    const resetPasswordUrl = this.constantsService.resetPasswordUrl();
    let body;
    if (this.r.valid) {
      if (this.r.value.password === this.r.value.confirm) {
        this.changePasswordToken = this.activatedRoute.snapshot.queryParamMap.get('token');
        body = {
          'password': this.r.value.password,
          'token': this.changePasswordToken
        };
      } else {
        this.flashErrorMessage('Passwords dont match');
        return;
      }

    } else {
      this.flashErrorMessage('Details not valid');
      return;
    }
    this.serverService.makePostReq<IUser>({url: resetPasswordUrl, body})
      .subscribe(() => {
        this.panelActive = ELoginPanels.password_reset_notify;
      });
  }

  loginSubmitHandler(creds: any) {

    this.flashInfoMessage('Connecting to the server', 10000);
    localStorage.setItem(ENgxsStogareKey.IMI_BOT_STORAGE_KEY, null);
    /*logging out so that only one use can login in at one time*/
    this.store.dispatch([
      new ResetBotListAction(),
      new ResetAuthToDefaultState(),
      new ResetEnterpriseUsersAction(),
      new ResetBuildBotToDefault(),
      new ResetAnalytics2GraphData(),
      new ResetAnalytics2HeaderData(),
      new ResetAppState()
    ]);
    let body;
    let url = '';
    if (creds) {
      body = creds;
      url = this.constantsService.getConnectLoginUrl();
    } else {
      url = this.constantsService.getLoginUrl();
      if (this.loginForm.valid) {
        body = this.loginForm.value;
      } else {
        this.flashErrorMessage('Details not valid');
        this.disabeLoginButton = false;
        return;
      }
    }
    body = {
      ...body,
    };
    this.disabeLoginButton = true;
    const headerData: IHeaderData = {
      'auth-token': null,
      'user-access-token': null
    };
    this.serverService.makePostReq<IUser>({url, body, headerData})
      .pipe(switchMap(((user: IUser) => {
            this.userData = user;
            ServerService.setCookie('auth-token', user.auth_token);
            ServerService.setCookie('user-access-token', user.user_access_token);
            this.flashInfoMessage('Logged in. Fetching enterprise', 10000);
            if (this.userData.enterprises.length <= 1) {
              const enterpriseDate = {
                enterpriseId: this.userData.enterprises[0].enterprise_id.id,
                roleId: this.userData.enterprises[0].role_id.id,
                isActive: this.userData.is_active
              };
              return this.enterEnterprise(enterpriseDate);

            } else {
              this.enterpriseList = this.userData.enterprises;
              this.panelActive = ELoginPanels.enterprise_list_display;
              // console.log(this.enterpriseList);
              return of();
            }
          }
        ),
      ), switchMap((value) => {
        if (value) {
          this.gotUserData$.emit(value);
        }
        return of();
      }), catchError((e) => {
        this.loginFailedHandler();
        return of(1);
      }))
      .subscribe();

  }

  loginFailedHandler() {
    if (this.domainname) {
      this.connect_redirect_time = 4;
      setInterval(() => {
        --this.connect_redirect_time;
        if (this.connect_redirect_time === 1) {
          location.href = `https://${this.domainname}/login`;
        }
        if (this.connect_redirect_time < 0) {
          this.connect_redirect_time = 0;
        }
      }, 1000);
    }
    this.disabeLoginButton = false;
    this.flashErrorMessage('Problem with login. Please try again', 10000);
    return this.store.dispatch([
      new ResetAuthToDefaultState()
    ]);
  }

  showPanel(panel) {
    this.panelActive = panel;
  }

  enterEnterprise(Enterprise) {
    if (Enterprise.isActive) {
      const enterpriseLoginUrl = this.constantsService.getEnterpriseLoginUrl();
      const body = {
        'user_id': this.userData.id,
        'enterprise_id': Enterprise.enterpriseId,
        'role_id': Enterprise.roleId,
      };
      const headerData = {
        'auth-token': this.userData.auth_token
      };

      return this.serverService.makePostReq<any>({url: enterpriseLoginUrl, body, headerData});
      // .pipe(
      //   switchMap((value) => {
      //     this.gotUserData$.emit(value);
      //     return value;
      //   })
      // );
    } else {
      this.myToasterService.showErrorToaster('Please verify this enterprise before trying to login.');
      return of(null);
    }

  }

  clickedEnterprise(Enterprise) {

    console.log('asdadasd');
    this.loading = true;
    this.enterEnterprise(Enterprise)
      .subscribe((value) => {
        this.gotUserData$.emit(value);
      });
  }

  enterpriseLogout() {
    this.panelActive = ELoginPanels.login;
    this.disabeLoginButton = false;
    this.errorMessage = '';
    this.infoMessage = '';
    this.serverService.logout(true, true);
  }

  loginWithCustomEmail(email) {
    // this.loginForm.form.patchValue({email: email, password: 'Test@1234'});
    // this.loginSubmitHandler();
  }

  backToLogin() {
    this.panelActive = ELoginPanels.login;
    this.router.navigate(['/login'], {queryParams: {token: null, action: null}});

  }

  ngAfterViewInit(): void {
    // LoadJsService.load();
  }


}
