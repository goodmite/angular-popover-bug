import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilityService} from '../utility.service';

@Component({
  selector: 'app-chat-consumer-form',
  templateUrl: './chat-consumer-form.component.html',
  styleUrls: ['./chat-consumer-form.component.scss']
})
export class ChatConsumerFormComponent implements OnInit {

  @Input() customConsumerDetails;
  @Output() saveConsumerDetails$ = new EventEmitter();
  errorMessage = "";
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
  }

  validateAndSubmit(customConsumerDetails){
    this.errorMessage="";
    let doesConsumerFomContainSomeDetail =  this.utilityService.isAtleastOneValueIsDefined(customConsumerDetails);
    if(doesConsumerFomContainSomeDetail){
      this.saveConsumerDetails$.emit(customConsumerDetails);
    }else {
      this.errorMessage = "Please fill atleast one field"
    }
  }

}