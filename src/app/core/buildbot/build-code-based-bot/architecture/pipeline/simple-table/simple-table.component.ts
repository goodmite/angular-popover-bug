import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {

  @Input() tableData: {pipeline_modules:any};
  constructor() { }

  ngOnInit() {
    this.tableData;

  }

}
