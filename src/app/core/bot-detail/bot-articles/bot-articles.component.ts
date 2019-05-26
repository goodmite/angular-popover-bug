import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ConstantsService } from 'src/app/constants.service';
import { ServerService } from 'src/app/server.service';
import { IHeaderData } from 'src/interfaces/header-data';
import { IBot } from '../../interfaces/IBot';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { UtilityService } from 'src/app/utility.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ICorpus, IArticleItem, ICategoryMappingItem } from '../../interfaces/faqbots';
import { ModalConfirmComponent } from 'src/app/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-bot-articles',
  templateUrl: './bot-articles.component.html',
  styleUrls: ['./bot-articles.component.scss']
})
export class BotArticlesComponent implements OnInit {

  constructor(
    private constantsService: ConstantsService,
    private serverService: ServerService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
  ) { }
  @Input() bot: IBot;
  corpus : ICorpus;
  loaded: boolean = false;
  showEditAndViewArtical: boolean = false;
  myObject = Object;
  articleFilterForm: FormGroup;
  filter_categorie_id_list: string[];
  selectedArticle : IArticleItem;
  dialogRefWrapper = {ref: null};
  searchCategorie = "";
  categoryMappingClone : ICategoryMappingItem[];
  showCreateNewCategoryInput = false;
  currentPageOfArtcle;
  ngOnInit() {
    this.getCorpusAndSetArticleFilterForm$()
      .subscribe()
  }


  getCorpusAndSetArticleFilterForm$() {
    let headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };
    let getCorpusForFAQBot = this.constantsService.getDraftCorpusForFAQBot();

    return this.serverService.makeGetReq<any>({ url: getCorpusForFAQBot, headerData })
      .pipe(
        map((val) => {
          this.corpus = val;
          this.loaded = true;
          let formObj = {};
          this.categoryMappingClone = this.utilityService.createDeepClone(val.category_mapping);
          val.category_mapping.forEach((categorie) => {
            formObj[categorie.category_id] = [false];
          })
          this.articleFilterForm = this.formBuilder.group(
            formObj
          );
        })
      )
  }

  getCorpusAndSetArticleFilterForm() {
    this.getCorpusAndSetArticleFilterForm$()
      .subscribe()
  }


  makeFilterList(form: FormGroup) {

    // this.currentPageOfArtcle = 1;
    this.currentPageOfArtcle = new Number(0);
    this.articleFilterForm = form;
    this.filter_categorie_id_list = [];
    for (let i of Object.keys(form.value)) {
      if (form.value[i]) {
        this.filter_categorie_id_list.push(i)
      }
    }
  }
  goBackToArticalList(){
    this.getCorpusAndSetArticleFilterForm();
    this.showEditAndViewArtical = false;
  }
  removeFilterItemById(categorie_id) {
    this.currentPageOfArtcle = 0;
    this.articleFilterForm.patchValue({ [categorie_id]: false });
    this.makeFilterList(this.articleFilterForm);
  }
  exportArticalToCsv() {
    let csvFormat = this.corpus.sections.map(element => {
      return {
        Answer: element.answers[0].text[0],
        Questions: element.questions.toString()
      }
    });
    this.utilityService.downloadArrayAsCSV(csvFormat, {});
  }
  openArticleEditAndView(article: IArticleItem) {
    // add qurey parems
    this.showEditAndViewArtical = true;
    this.selectedArticle = article;
  }
  openArticleCreate() {
    let article = {
      'answers':[{"text": [""]}],
      'category_id':'unassigned',
      'questions':[""]
  }
    // add qurey parems
    this.showEditAndViewArtical = true;
    this.selectedArticle = article;
  }
  openCategoryModifyModal(template :TemplateRef<any>){

      this.utilityService.openPrimaryModal(template, this.matDialog, this.dialogRefWrapper);
      setTimeout(() => {
        this.showCreateNewCategoryInput = false;
        this.categoryMappingClone = this.utilityService.createDeepClone(this.corpus.category_mapping);
      }, 0);

  }

  // edit and view artical functions
// update artical
  updateArticle$(articleData : IArticleItem) {
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };
    let create = !articleData.section_id;

    let body = {
      'questions': articleData.questions,
      'answers': articleData.answers,
      'category_id': articleData.category_id

    }
    let url;

    if (!create){
      body['section_id'] = articleData.section_id;
      url = this.constantsService.updateArticelUrl();
    }
    else{
      url = this.constantsService.createArticelUrl();
    }


    return this.serverService.makePostReq<any>({ headerData, body, url })
  }

  updateArticle(articleData : IArticleItem){
    this.updateArticle$(articleData)
    .subscribe((value)=>{
      if(value){
        this.getCorpusAndSetArticleFilterForm$().subscribe((v)=>{
          this.utilityService.showSuccessToaster("Article succesfully saved");
          this.showEditAndViewArtical = false;
        })
        // this.saveAndTrain.emit();
      }

    })
  }

  // delete artical
  async openDeleteArticle(article){
    await this.utilityService.openDialog({
      dialogRefWrapper: this.dialogRefWrapper,
      classStr:'danger-modal-header-border',
      data:{
        actionButtonText:"Delete article",
        message: `Are you sure you want to delete the selected article? 
          The corpus has to be trained again to preview the change.`,
        title:`Delete article?`,
        isActionButtonDanger:true,
        inputDescription: null,
      },
      dialog: this.matDialog,
      component:ModalConfirmComponent
    }).then((data)=>{
      if(data){
        this.deleteArticle(article);
      }
    })
  }
  deleteArticle(article){
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };

    let body = {
      "section_id":  article.section_id,
      "category_id": article.category_id
    }
    let url = this.constantsService.deleteArticelUrl()
    this.serverService.makePostReq<any>({ headerData, body, url })
      .subscribe(value =>{
        if(value) {
          this.getCorpusAndSetArticleFilterForm$()
          .subscribe(v=>{
            this.showEditAndViewArtical = false;
          })

      }})
  }

  // train stuff
  openTrainModal(){
    this.utilityService.openDialog({
      dialogRefWrapper: this.dialogRefWrapper,
      classStr: 'danger-modal-header-border',
      data: {
        actionButtonText: `Continue`,
        message: 'Leave a comment about why you are training the bot so that it can be tracked in the bot’s history.',
        title: `Train knowledge base`,
        isActionButtonDanger: false,
        inputDescription: "Comment"
      },
      dialog: this.matDialog,
      component: ModalConfirmComponent
    }).then((data) => {
      if (data) {
        // this.decryptSubmit()

        this.trainBotAndGetCorpus(data);
      }
    })
  }


  trainCorpus$(description){
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };

    let body = {
      'bot_id': this.bot.id,
      'description':description
    }

    let url = this.constantsService.corpusTrainUrl()
    return this.serverService.makePostReq<any>({ headerData, body, url });
  }

  trainBotAndGetCorpus(description) {
    this.trainCorpus$(description)
      .subscribe((value) => {
        if (value) {
          this.getCorpusAndSetArticleFilterForm$()
          .subscribe(()=>{
            this.showEditAndViewArtical = false;
          })
        }
      })
  }

  trainAndUpdate(articleData : IArticleItem){

    this.updateArticle$(articleData)
    .subscribe((value) => {
      if(value){
        let description = articleData.questions[0] + " on " + new Date();
        this.trainBotAndGetCorpus(description);
      }
    })
  }
  // make live stuff

  makeLiveCorpus(){
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };

    let body = {
      'corpus_id': this.corpus.id
    }

    let url = this.constantsService.makeCorpusLiveUrl()
    this.serverService.makePostReq<any>({ headerData, body, url })
    .subscribe(val=>{
      this.utilityService.showSuccessToaster(val.message);
    });
  }

  // category handeling

  categoryUpdate(body){
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };
    const url = this.constantsService.updateCategoryUrl();
    this.serverService.makePostReq<any>({ headerData, body, url })
      .subscribe((value)=>{

        for (var i in this.corpus.category_mapping) {
          if (this.corpus.category_mapping[i].category_id == value.updated_category.category_id) {
            this.corpus.category_mapping[i] = value.updated_category;
            this.corpus.category_mapping[i] = {...this.corpus.category_mapping[i]};
            this.corpus.category_mapping = [...this.corpus.category_mapping];
            this.corpus = {...this.corpus};
             break;
          }
        }
        this.utilityService.showSuccessToaster("Caregory succesfully updated");
      });
  }
  categoryDelete(body){
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };
    const url = this.constantsService.deleteCategoryUrl();
    this.serverService.makePostReq<any>({ headerData, body, url })
    .subscribe((value)=>{
      this.getCorpusAndSetArticleFilterForm$()
      .subscribe((v)=>
      this.utilityService.showSuccessToaster("Caregory succesfully deleted"));
    })
  }
  categoryCreate(body){
    const headerData: IHeaderData = {
      'bot-access-token': this.bot.bot_access_token
    };
    const url = this.constantsService.createCategoryUrl();
    this.serverService.makePostReq<any>({ headerData, body, url })
      .subscribe((value)=>{
        this.corpus.category_mapping.push(value.new_category);
        this.corpus.category_mapping = [...this.corpus.category_mapping];
        this.corpus = {...this.corpus};
        this.showCreateNewCategoryInput = false;
        this.categoryMappingClone.push(value.new_category);
        this.categoryMappingClone = [...this.categoryMappingClone];
        this.utilityService.showSuccessToaster("Caregory succesfully created");
        let formObj = {};
          this.categoryMappingClone.forEach((categorie) => {
            formObj[categorie.category_id] = [false];
          })
          this.articleFilterForm = this.formBuilder.group(
            formObj
          );
      })
  }

  cancelCategoryEditToUnchangedValue(){
    this.categoryMappingClone = this.utilityService.createDeepClone(this.corpus.category_mapping);
  }

}