import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
  QueryList, ViewChildren
} from '@angular/core';
import {ConstantsService} from 'src/app/constants.service';
import {ServerService} from 'src/app/server.service';
import {IBot} from 'src/app/core/interfaces/IBot';
import {IHeaderData} from 'src/interfaces/header-data';
import {ActivatedRoute, Router} from '@angular/router';
import {IArticleItem, ICategoryMappingItem, ICorpus} from 'src/app/core/interfaces/faqbots';
import {DomService} from '../../../../dom.service';
import {EAllActions, ERoleName} from 'src/app/typings/enum';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {IUser} from 'src/app/core/interfaces/user';
import {IAuthState} from 'src/app/auth/ngxs/auth.state';
import {PermissionService} from 'src/app/permission.service';

import {MatDialog} from '@angular/material';
import {UtilityService} from 'src/app/utility.service';
import {ModalConfirmComponent} from 'src/app/modal-confirm/modal-confirm.component';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {FormsService} from '../../../../forms.service';

// [disabled]="JSON.stringify(articleData) === JSON.stringify(_article)"

@Component({
  selector: 'app-edit-and-view-articles',
  templateUrl: './edit-and-view-articles.component.html',
  styleUrls: ['./edit-and-view-articles.component.scss']
})
export class EditAndViewArticlesComponent implements OnInit {

  @ViewChild('questionListContainer') questionListContainer: ElementRef;
  questionsForm = this.formBuilder.group({
    text: ['', []]
  });
  utteranceForm = this.formBuilder.group({
    questions: this.formBuilder.array([])
  });
  store: any;

  constructor(
    private constantsService: ConstantsService,
    private serverService: ServerService,
    private utilityService: UtilityService,
    private permissionService: PermissionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  logicCodeForm: FormGroup;
  @Input() bot: IBot;
  _article: IArticleItem;
  @Input() set article(value: IArticleItem) {
    this.logicCodeForm = this.formBuilder.group({
      logic: [value.logic || '', Validators.required],
    });
    this.articleData = this.utilityService.createDeepClone(value);

    this.initUtteranceForm(this.articleData.questions);
    this._article = value;
  }

  @Input() category_mapping: ICategoryMappingItem[];
  @Input() corpus: ICorpus;
  articleData: IArticleItem;
  @Select() loggeduser$: Observable<{ user: IUser }>;
  @Output() goBack$ = new EventEmitter();
  @Output() corpusNeedsReload$ = new EventEmitter();
  @Output() saveAndTrain$ = new EventEmitter();
  @Output() updateArticle$ = new EventEmitter();
  @Output() deleteArticle$ = new EventEmitter();
  @Output() trainAndUpdate$ = new EventEmitter();
  userRole;
  myEAllActions = EAllActions;
  myERoleName = ERoleName;
  article_id: number;
  currentModal: string;
  JSON = JSON;
  dialogRefWrapper = {ref: null};
  assignCategoryModal: FormGroup;

  ngOnInit() {
    this.assignCategoryModal = this.formBuilder.group({
      inputType: ['existing'],
      existingCategoryName: [''],
      newCategoryName: [{value: '', disabled: true}, [FormsService.startWithAlphabetValidators(), FormsService.lengthValidator({min: 1, max: 64})]],
    });
    this.assignCategoryModal.get('inputType').valueChanges.subscribe((data) => {
      if (data === 'new') {
        this.assignCategoryModal.get('newCategoryName').enable();
        this.assignCategoryModal.get('existingCategoryName').disable();
      } else {
        this.assignCategoryModal.get('newCategoryName').disable();
        this.assignCategoryModal.get('existingCategoryName').enable();
      }
    });
    this.logicCodeForm.get('logic').valueChanges
      .pipe(debounceTime(100))
      .subscribe((val) => {
        this.articleData.logic = val;
      });
    this.loggeduser$
      .subscribe((value: IAuthState) => {
        if (value && value.user !== null) {
          this.userRole = value.user.role.name;
        }
      });
  }

  initUtteranceForm(array: any[]) {
    array.forEach((val) => {
      (this.utteranceForm.get('questions') as FormArray).push(this.getUtteranceFG(val));
    });

  }


  trackByIndex(index: number, obj: any): any {

    return obj.__id;
  }

  deleteQustionWithId(index: number) {
    if (!(this.userRole === ERoleName.Analyst || this.userRole === ERoleName.Tester)) {
      if (index > -1) {
        if (this.utteranceForm.value.length === 1) {
          this.utilityService.showErrorToaster('Atleast one question is needed for an article');
        } else {
          // this.articleData.questions.splice(index, 1);
          (this.utteranceForm.get('questions') as FormArray).removeAt(index);
        }
      }
    }
  }

  addNewQuestion(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const text = form.value.text;
    if (text.trim()) {
      (this.utteranceForm.get('questions') as FormArray).insert(0, this.getUtteranceFG(text.trim()));
      form.reset();
    }
  }

  goBackToArticle() {
    this.goBack$.emit();
  }

  updateArticleClicked() {
    if (this.corpus.state === 'training') {
      this.trainingIsGoingOn();
    } else {
      this.articleData.logic = this.logicCodeForm.value.logic || '';
      this.updateArticle$.emit({...this.articleData, questions: this.utteranceForm.value.questions.map(e => e.text)});
    }
  }


  deleteArticleClicked() {
    if (this.corpus.state === 'training') {
      this.trainingIsGoingOn();
    } else {


      this.deleteArticle$.emit(this.articleData);
    }
  }

  updateAndTrain() {
    if (this.corpus.state === 'training') {
      this.trainingIsGoingOn();
    } else {

      this.trainAndUpdate$.emit({...this.articleData, questions: this.utteranceForm.value.questions.map(e => e.text)});
    }
  }

  changeArticalCategory(formValue) {
    return new Promise((resolve) => {
      const headerData: IHeaderData = {
        'bot-access-token': ServerService.getBotTokenById(this.bot)
      };
      if (this.articleData.section_id) {
        const body = {
          'old_category': this._article.category_id,
          'section_id': [this.articleData.section_id]
        };
        if (formValue.inputType === 'existing') {
          body['new_category'] = formValue.existingCategoryName;
          const headerData_temp: IHeaderData = {
            'bot-access-token': ServerService.getBotTokenById(this.bot)
          };
          const url = this.constantsService.changeSectionCategoryUrl();
          this.serverService.makePostReq<any>({headerData: headerData_temp, body, url})
            .subscribe((value) => {
              this.category_mapping = value.category_mapping;
              this.category_mapping = [...this.category_mapping];
              this._article.category_id = value.new_category;
              this.articleData.category_id = value.new_category;

              this.initUtteranceForm(this.articleData.questions);
              this.utilityService.showSuccessToaster('Category succesfully updated');
              resolve(value);
            });
        }
        if ('new' === formValue.inputType) {
          body['category_name'] = formValue.newCategoryName;
          const headerData_temp: IHeaderData = {
            'bot-access-token': ServerService.getBotTokenById(this.bot)
          };
          const url = this.constantsService.changeSectionCategoryWithNewCategoryUrl();
          this.serverService.makePostReq<any>({headerData: headerData_temp, body, url})
            .subscribe((value) => {
              this.category_mapping = value.category_mapping;
              this.category_mapping = [...this.category_mapping];
              this._article.category_id = value.new_category;
              this.articleData.category_id = value.new_category;

              this.initUtteranceForm(this.articleData.questions);
              this.utilityService.showSuccessToaster('Category succesfully updated');
              resolve(value);
            });

        }
      } else {
        if (formValue.inputType === 'existing') {
          this.articleData['category_id'] = formValue.existingCategoryName;
          resolve();
        }
        if (formValue.inputType === 'new') {
          const body = {
            'category_name': formValue.newCategoryName
          };
          const url = this.constantsService.createCategoryUrl();
          this.serverService.makePostReq<any>({headerData, body, url})
            .subscribe((value) => {
              this.articleData['category_id'] = value.new_category.category_id;
              this.category_mapping.push(value.new_category);
              resolve(value);
            });
        }
      }
    });

  }

  openCategoryModifyModal(template: TemplateRef<any>) {
    if (this.corpus.state === 'training') {
      this.trainingIsGoingOn();
    } else {
      this.utilityService.openPrimaryModal(template, this.matDialog, this.dialogRefWrapper);
    }
  }

  trainingIsGoingOn() {
    this.utilityService.showErrorToaster('Bot is training so the action can not be performed.');
  }

  skipConformationModalSubmitted() {
    if (this.currentModal === 'saveNTrain') {
      this.updateAndTrain();
    }
    if (this.currentModal === 'save') {
      this.updateArticleClicked();
    }
    this.assignCategoryModal.reset();
  }

  globalConformationModalSubmitted(formValue) {

    if (this.currentModal === 'saveNTrain') {
      this.updateAndTrainModalSubmitted(formValue);
    }
    if (this.currentModal === 'save') {
      this.updateArticleClickedModalsubmitted(formValue);
    }
  }

  updateArticleClickedModal(template: TemplateRef<any>) {

    if (this.corpus.state === 'training') {
      this.trainingIsGoingOn();
    } else if (this.articleData.category_id === 'unassigned' && !this.articleData.section_id) {
      this.currentModal = 'save';
      this.utilityService.openPrimaryModal(template, this.matDialog, this.dialogRefWrapper);
    } else {
      this.updateArticleClicked();
    }
  }

  updateArticleClickedModalsubmitted(formValue) {

    this.changeArticalCategory(formValue)
      .then(() => {
        this.updateArticleClicked();
      });

  }

  updateAndTrainModal(template: TemplateRef<any>) {
    if (this.corpus.state === 'training') {
      this.trainingIsGoingOn();
    } else if (this.articleData.category_id === 'unassigned' && !this.articleData.section_id) {
      this.currentModal = 'saveNTrain';
      this.utilityService.openPrimaryModal(template, this.matDialog, this.dialogRefWrapper);
    } else {
      this.updateAndTrain();
    }
  }

  updateAndTrainModalSubmitted(formValue) {
    this.changeArticalCategory(formValue)
      .then(() => {
        this.updateAndTrain();
      });

  }

  isThisPermissionGiven(tabNameInfo) {
    let isDenied = true;
    if (Array.isArray(tabNameInfo)) {
      tabNameInfo.forEach((tab) => {
        isDenied = isDenied && this.permissionService.isTabAccessDenied(tab);
      });
    } else {
      isDenied = this.permissionService.isTabAccessDenied(tabNameInfo); // false;//this.constantsService.isTabAccessDenied(tabName);

    }
    return !isDenied;

  }


  showOpenCloseWithoutSavingModal() {
    if (JSON.stringify(this.articleData) === JSON.stringify(this._article)) {
      this.goBackToArticle();
    } else {
      this.openCloseWithoutSavingModal();
    }

  }


  async openCloseWithoutSavingModal() {

    await this.utilityService.openDialog({
      dialogRefWrapper: this.dialogRefWrapper,
      classStr: 'danger-modal-header-border',
      data: {
        actionButtonText: 'Close without saving',
        message: 'All your unsaved changes will be lost if you don\'t save.',
        title: `Close without saving?`,
        isActionButtonDanger: true,
        inputDescription: null,
        closeButtonText: 'Keep editing'
      },
      dialog: this.matDialog,
      component: ModalConfirmComponent
    }).then((data) => {
      if (data) {
        this.goBackToArticle();
      }
    });
  }

  getUtteranceFG(val: string): FormGroup {
    return this.formBuilder.group({
      'text': [val, []],
      '__id': [UtilityService.generateUUid()]
    });
  }
}














