import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBot} from '../../../interfaces/IBot';
import {ActivatedRoute} from '@angular/router';
import {LoggingService} from '../../../../logging.service';
import {EBotType, UtilityService} from '../../../../utility.service';
import {EventService} from '../../../../event.service';
import {BotConfigService} from './bot-config.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {ServerService} from '../../../../server.service';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import { Subscription } from 'rxjs';
import {EAllActions} from "../../../../typings/enum";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher1 implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid);
  }
}

@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss'],
  providers: [
    {provide: ErrorStateMatcher, useClass: MyErrorStateMatcher1}
  ]
})
export class BotConfigComponent implements OnInit {

  @Input() bot: IBot;
  selectedTabIndex = 0;
  activeTab = 'basic';
  myEAllActions = EAllActions;
  @Output() datachanged$ = new EventEmitter();
  @Output() botData$ = new EventEmitter();
  basicInfoForm: FormGroup;
  dataManagementForm: FormGroup;
  securityForm: FormGroup;
  faqHandoverANdInterfaceForm : FormGroup;
  integrationForm: NgForm;
  myEBotType = EBotType;
  intigrationFormSubcription : Subscription;
  bot_type;
  id;
  formDirty = false;
  @Output() initDone$ = new EventEmitter<BotConfigComponent>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private botConfigService: BotConfigService,
    private serverService: ServerService,
  ) {
  }

  integrationFormInit(integrationForm: NgForm) {
    this.integrationForm = integrationForm;
    this.integrationForm.valueChanges.subscribe(()=>this.emitBotDirtyEvent(true));
    this.initDone$.emit(this);
  }

  emitBotDirtyEvent(isDirty){
    // EventService.botDataDirty$.emit({[ESideBarTab.setting]:isDirty});

    this.botData$.emit(this.createBotData());

  }


  ngOnInit() {
    this.bot_type = this.activatedRoute.snapshot.queryParamMap.get('bot_type') || this.activatedRoute.snapshot.data['bot_type'];





    EventService.botUpdatedInServer$.subscribe(()=>{
      this.initDone$.emit(this);
    });

    this.basicInfoForm = this.botConfigService.getBasicInfoForm(this.bot);
    this.dataManagementForm = this.botConfigService.getDataManagementForm(this.bot);
    this.securityForm = this.botConfigService.getSecurityForm(this.bot);
    this.faqHandoverANdInterfaceForm = this.botConfigService.getFaqHandoverANdInterfaceForm(this.bot);
    this.activeTab = this.activatedRoute.snapshot.queryParamMap.get('config') || 'basic';
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.basicInfoForm.valueChanges.subscribe(()=>this.emitBotDirtyEvent(true));
    this.dataManagementForm.valueChanges.subscribe(()=>this.emitBotDirtyEvent(true));
    this.securityForm.valueChanges.subscribe(()=>this.emitBotDirtyEvent(true));
    this.faqHandoverANdInterfaceForm.valueChanges.subscribe(()=>this.emitBotDirtyEvent(true));

    if(this.bot_type === EBotType.intelligent){
      /**
       * for type = chatbot, wait for integration form to init
       * */
      this.initDone$.emit(this);
    }
  }
  ngOnDestroy(){
    this.botData$.emit(this.bot);
  }
  tabClicked(activeTab: string) {
    this.activeTab = activeTab;
    LoggingService.log(this.activeTab);
    if(this.intigrationFormSubcription) this.intigrationFormSubcription.unsubscribe();
  }


  createBotData(){
    let combinedForms = [this.basicInfoForm, this.dataManagementForm, this.securityForm, this.faqHandoverANdInterfaceForm ];
    combinedForms = combinedForms.filter(form => form);
    let bot = UtilityService.getCombinedBotData(combinedForms);
    if (this.integrationForm && this.integrationForm.value) {
      bot.integrations = this.integrationForm.value;
    }
    return bot;
  }

  /*
  * updateBotHandler: combine the data from various forms and update the bot
  * */
  updateBotHandler() {
    let invalidFormIndex = this.getInvalidForm();
    if (invalidFormIndex >= 0) {
      this.selectedTabIndex = invalidFormIndex;
      this.showFormInvalidError(invalidFormIndex);
      return;
    }

    let bot = this.createBotData();

    // let combinedForms = [this.basicInfoForm, this.dataManagementForm, this.securityForm];
    // combinedForms = combinedForms.filter(form => form);
    // let bot = UtilityService.getCombinedBotData(combinedForms);
    // if (this.integrationForm && this.integrationForm.value) {
    //   bot.integrations = this.integrationForm.value;
    // }
    bot.id = this.bot.id;
    bot.bot_access_token = this.bot.bot_access_token;
    this.serverService.updateBot(bot).subscribe(()=>{
      this.emitBotDirtyEvent(false);
    });
  }

  getInvalidForm() {
    let combinedForms = [this.basicInfoForm, this.dataManagementForm, this.securityForm, this.integrationForm, this.faqHandoverANdInterfaceForm];
    return combinedForms.filter(form=>!!form).findIndex((form) => {
      return form.invalid;
    });
  }

  showFormInvalidError(index) {
    if (index === 0) {
      this.utilityService.showErrorToaster('Basic info form is not valid');
      return;
    } else if (index === 1) {
      this.utilityService.showErrorToaster('Data management form is not valid');
      return;
    } else if (index === 2) {
      this.utilityService.showErrorToaster('Security form is not valid');
      return;
    } else if (index === 3) {
      this.utilityService.showErrorToaster('Integration form is not valid');
      return;
    }
  }

}
