import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.scss']
})
export class ArticleFilterComponent implements OnInit {

  constructor() { }
  @Input() categoryMapping;
  @Input() articleFilterForm: FormGroup;
  @Output() filterCategory = new EventEmitter();
  filter_categorie_search:string = "";

  changedFilterList(value){
    this.filterCategory.emit(value);
  }
  clearFilterList(){
    this.articleFilterForm.reset();
    this.filterCategory.emit(this.articleFilterForm);
  }
  ngOnInit() {
  }

}
