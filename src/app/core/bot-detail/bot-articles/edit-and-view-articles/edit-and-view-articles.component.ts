import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ConstantsService } from 'src/app/constants.service';
import { ServerService } from 'src/app/server.service';
import { UtilityService } from 'src/app/utility.service';
import { IBot } from 'src/app/core/interfaces/IBot';
import { IHeaderData } from 'src/interfaces/header-data';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleItem, ICategoryMappingItem, ICorpus } from 'src/app/core/interfaces/faqbots';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-and-view-articles',
  templateUrl: './edit-and-view-articles.component.html',
  styleUrls: ['./edit-and-view-articles.component.scss']
})
export class EditAndViewArticlesComponent implements OnInit {

  constructor(
    private constantsService: ConstantsService,
    private serverService: ServerService,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
  ) { }
  @Input() bot: IBot;
  @Input() article: IArticleItem;
  @Input() category_mapping: ICategoryMappingItem[];
  @Input() corpus :ICorpus;
  articleData: IArticleItem;
  @Output() goBack = new EventEmitter();
  @Output() corpusNeedsReload = new EventEmitter();
  @Output() saveAndTrain = new EventEmitter();
  @Output() updateArticle = new EventEmitter();
  @Output() deleteArticle = new EventEmitter();
  @Output() trainAndUpdate = new EventEmitter();
  article_id: number;
  dialogRefWrapper = { ref: null };

  ngOnInit() {
    this.articleData = this.utilityService.createDeepClone(this.article);
    this.activatedRoute.queryParamMap
      .subscribe((value) => {
        if (value.get('article_id')) {
          this.article_id = Number(value.get('article_id'));
          if (this.article_id) {

          }
          }
      });
   
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  deleteQustionWithId(index: number) {
    if (index > -1) {
      if(this.articleData.questions.length == 1){
        this.utilityService.showErrorToaster("Can't delete the only question");
      }else{
          this.articleData.questions.splice(index, 1);
      }
    }
    
    
  }
  addNewQuestion() {
    this.articleData.questions.push("");
  }
  goBackToArticle() {
    this.goBack.emit();
  }

  updateArticleClicked() {
    if(this.corpus.state == "training"){
      this.trainingIsGoingOn();
    }
    else{
      this.updateArticle.emit(this.articleData);
    }
  }

 

  deleteArticleClicked() {
    if(this.corpus.state == "training"){
      this.trainingIsGoingOn();
    }
    else{
      
    
    this.deleteArticle.emit(this.articleData);
    }
  }

  updateAndTrain() {
    if(this.corpus.state == "training"){
      this.trainingIsGoingOn();
    }
    else{
      
    this.trainAndUpdate.emit(this.articleData);
    }
  }

  changeArticalCategory(formValue) {
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };
    if (this.articleData.section_id) {
      let body = {
        "old_category": this.article.category_id,
        "section_id": [this.articleData.section_id]
      }
      if (formValue.inputType == "existing") {
        body["new_category"] = formValue.existingCategoryName;
        const headerData: IHeaderData = {
          'bot-access-token': this.bot.bot_access_token
        };
        const url = this.constantsService.changeSectionCategoryUrl();
        this.serverService.makePostReq<any>({ headerData, body, url })
          .subscribe((value) => {
            this.category_mapping = value.category_mapping;
            this.category_mapping = [...this.category_mapping];
            this.article.category_id = value.new_category;
            this.articleData.category_id = value.new_category;
            this.utilityService.showSuccessToaster("Caregory succesfully updated");
          })
      }
      if (formValue.inputType == "new") {
        body['category_name'] = formValue.newCategoryName;
        const headerData: IHeaderData = {
          'bot-access-token': this.bot.bot_access_token
        };
        const url = this.constantsService.changeSectionCategoryWithNewCategoryUrl();
        this.serverService.makePostReq<any>({ headerData, body, url })
          .subscribe((value) => {
            this.category_mapping = value.category_mapping;
            this.category_mapping = [...this.category_mapping];
            this.article.category_id = value.new_category;
            this.articleData.category_id = value.new_category;
            this.utilityService.showSuccessToaster("Caregory succesfully updated");
          })

      }
    } else {
      if (formValue.inputType == "existing") {
        this.articleData['category_id'] = formValue.existingCategoryName;
      }
      if (formValue.inputType == "new") {
        const body = {
          "category_name": formValue.newCategoryName
        }
        const url = this.constantsService.createCategoryUrl();
        this.serverService.makePostReq<any>({ headerData, body, url })
          .subscribe((value) => {
            this.articleData['category_id'] = value.new_category.category_id;
            this.category_mapping.push(value.new_category);
          })
      }
    }

  }
  openCategoryModifyModal(template: TemplateRef<any>) {
    if(this.corpus.state == "training"){
      this.trainingIsGoingOn();
    }
    else{
      this.utilityService.openPrimaryModal(template, this.matDialog, this.dialogRefWrapper);
    }
  }
  trainingIsGoingOn(){
    this.utilityService.showErrorToaster("Bot is training so the action can not be performed.");
  }
}