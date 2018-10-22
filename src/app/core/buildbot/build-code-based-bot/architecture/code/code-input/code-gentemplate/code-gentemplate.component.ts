import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IOutputItem} from '../code-input.component';


@Component({
  selector: 'app-code-gentemplate',
  templateUrl: './code-gentemplate.component.html',
  styleUrls: ['./code-gentemplate.component.scss']
})
export class CodeGentemplateComponent implements OnInit {

  constructor() { }
  @Input() outputItem: IOutputItem;
  outputItemClone: IOutputItem;
  @Input() myIndex: number;
  @Input() totalResponseTemplateComponentCount: number;
  @Output() deleteTemplate: EventEmitter<string> = new EventEmitter<string>();
  @Output() moveTempUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() moveTempDown: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();

  selected: boolean;
  delete(i) {
    this.deleteTemplate.emit(i);
  }
  moveUp(i) {
    this.moveTempUp.emit(i);
  }
  moveDown(i) {
    this.moveTempDown.emit(i);
  }
  onSelected(b) {
    this.selectionChanged.emit(JSON.stringify({
      select: b,
      index: this.myIndex
    }));
  }


  ngOnInit() {
    this.outputItemClone = {...this.outputItem}
  }

  codeEditorTextCHanged(data){
    this.outputItem = Object.assign(this.outputItem, JSON.parse(data));
  }

}