import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBot} from '../../../interfaces/IBot';
import {ActivatedRoute} from '@angular/router';
import {LoggingService} from '../../../../logging.service';
import {EBotType} from '../../../../utility.service';
import {EAllActions} from '../../../../constants.service';
import {EventService} from '../../../../event.service';

@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss']
})
export class BotConfigComponent implements OnInit {

  @Input() bot: IBot;
  activeTab = 'basic';
  myEAllActions = EAllActions;
  @Output() datachanged$ = new EventEmitter();
  myEBotType = EBotType;
  bot_type;
  id;
  formDirty = false;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeTab  =  this.activatedRoute.snapshot.queryParamMap.get('config') ||  'basic';
    // this.bot_type  =  this.activatedRoute.snapshot.queryParamMap.get('bot_type');
    // if(!this.bot_type){
    //
    //   this.bot_type  =  this.activatedRoute.snapshot.data['bot_type'];
    // }
    this.bot_type  =  this.activatedRoute.snapshot.queryParamMap.get('bot_type') || this.activatedRoute.snapshot.data['bot_type'];
    this.id  =  this.activatedRoute.snapshot.queryParamMap.get('id');
  }

  tabClicked(activeTab: string) {
    this.activeTab = activeTab;
    LoggingService.log(this.activeTab);
  }

  updateBot(){
    EventService.updateBot$.emit()
  }

}
