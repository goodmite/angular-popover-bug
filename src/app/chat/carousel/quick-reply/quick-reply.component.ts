import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMessageData} from '../../../../interfaces/chat-session-state';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quick-reply',
  templateUrl: './quick-reply.component.html',
  styleUrls: ['./quick-reply.component.scss']
})
export class QuickReplyComponent implements OnInit {

  @Input() isFullScreenPreview =false;
  @Input() messageData:IMessageData;
  @Output() sendMessageToBotServer$ = new EventEmitter();
  carasolItemShownInOneScreen = 2;
  totalItemsInCarasol:number;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

}
