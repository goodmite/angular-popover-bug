import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, OnDestroy} from '@angular/core';
import {ICustomNerItem} from '../../../../../../../interfaces/custom-ners';
import {NgForm} from '@angular/forms';
import {UtilityService} from '../../../../../../utility.service';
import {ConstantsService, EAllActions, ERouteNames} from '../../../../../../constants.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HandsontableComponent} from '../../../../../../handsontable/handsontable.component';
import {ELogType, LoggingService} from '../../../../../../logging.service';
import {ModalImplementer} from '../../../../../../modal-implementer';
import {MatDialog} from '@angular/material';
import {EventService} from '../../../../../../event.service';
import {ModalConfirmComponent} from '../../../../../../modal-confirm/modal-confirm.component';
import {SideBarService} from '../../../../../../side-bar.service';

@Component({
  selector: 'app-knowledge-base-presentation',
  templateUrl: './knowledge-base-presentation.component.html',
  styleUrls: ['./knowledge-base-presentation.component.scss']
})

export class KnowledgeBasePresentationComponent extends ModalImplementer implements OnInit, AfterViewInit {
  _selectedRowData: ICustomNerItem = {};
  process_raw_text = false;
  myEAllActions = EAllActions;
  myERouteNames = ERouteNames;

  // @ViewChild(HandsontableComponent)handsontableComponent: HandsontableComponent;
  @Input() set selectedRowData(value: ICustomNerItem) {
    if (!value) {
      return;
    }
    this._selectedRowData = value;

    this.key = value.key;
    if (value.ner_type) {
      this.ner_type = value.ner_type;
    }
    this.conflict_policy = value.conflict_policy || this.conflict_policy;
    this.process_raw_text = !!value.process_raw_text;
    // this.codeTextInputToCodeEditor = value.values && value.values.join(',');
    // this.codeTextInputToCodeEditorObj.text = value.values && value.values.join(',');
    if (value.ner_type === 'regex') {
      this.codeTextInputToCodeEditorObj.text = value.values && value.values[0];
    } else {
      this.codeTextInputToCodeEditorObj.text = value.values && JSON.stringify(value.values);
    }

    this.codeTextOutPutFromCodeEditor = this.codeTextInputToCodeEditorObj.text;

    this.codeTextInputToCodeEditorObj = {...this.codeTextInputToCodeEditorObj};
    try {
      this.handontable_colHeaders = Object.keys(value.values[0]);
    } catch (e) {
      LoggingService.error(e);
    }
    // for (let index = 0; index < this.handontable_colHeaders.length; index++) {
    // this.handontable_column[index] = {
    //   data: index, type: 'text'
    // }
    // }

    this.handontable_column = this.handontable_colHeaders;
  }

  @Input() handsontableData = ['', '', ''];
  @Output() updateOrSaveConcept$ = new EventEmitter();
  @Output() deleteNer$ = new EventEmitter();
  @Output() showTable$ = new EventEmitter();
  @Output() refreshTable$ = new EventEmitter();
  @ViewChild('form') form: NgForm;
  ner_id: string;
  key: string;
  routeName: string;
  ner_type = 'double_match';
  conflict_policy = 'override';
  codeTextInputToCodeEditor: string;
  codeTextInputToCodeEditorObj: { text: string } = {text: ''};
  codeTextOutPutFromCodeEditor: string;
  // handontable_column = this.constantsService.HANDSON_TABLE_KNOWLEDGE_BASE_columns;
  handontable_colHeaders = this.constantsService.HANDSON_TABLE_KNOWLEDGE_BASE_colHeaders;
  // readonly HANDSON_TABLE_KNOWLEDGE_BASE_colHeaders = ['', '', '',"","",'','','',''];
  handontable_column = [];
  // readonly HANDSON_TABLE_KNOWLEDGE_BASE_columns = [
  //   {data: 0, type: 'text'},
  //   {data: 1, type: 'text'},
  //   {data: 2, type: 'text'},
  //   {data: 3, type: 'text'},
  //   {data: 4, type: 'text'},
  //   {data: 5, type: 'text'}
  // ];
  constructor(
    public utilityService: UtilityService,
    public constantsService: ConstantsService,
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog
  ) {
    super(utilityService, matDialog);
  }

  ngOnInit() {
    this.routeName = this.activatedRoute.snapshot.data['routeName'];
    this.activatedRoute.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      this.ner_id = (<any>queryParamMap).params['ner_id'];
    });
  }

  async openDeleteModal() {
    // this.modalRef = this.modalService.show(template);

    await this.utilityService.openDialog({
      dialogRefWrapper: this.dialogRefWrapper,
      classStr: 'danger-modal-header-border',
      data: {
        actionButtonText: 'Delete',
        message: 'This action cannot be undone. Are you sure you wish to delete?',
        title: `Delete Concept?`,
        isActionButtonDanger: true,
        inputDescription: null,
        closeButtonText: 'Keep editing'
      },
      dialog: this.matDialog,
      component: ModalConfirmComponent
    }).then((data) => {

      if (data) {
        this.deleteNer$.emit(this.ner_id);
      }
    });
    // this.utilityService.openPrimaryModal(template, this.matDialog, this.dialogRefWrapper);

    // this.openDangerModal(template);
  }

  async openFile(inputEl) {

    this.codeTextInputToCodeEditorObj.text = await this.utilityService.readInputFileAsText(inputEl);
    this.codeTextInputToCodeEditorObj = {...this.codeTextInputToCodeEditorObj};
  }

  textChanged(codeText) {
    this.codeTextOutPutFromCodeEditor = codeText;
  }

  updateOrSaveConcept() {
    debugger;
    let outputData = this.createOutPutData();
    let ner_type = outputData.ner_type;
    let codeTextOutPutFromCodeEditor = outputData.codeTextOutPutFromCodeEditor;
    if (this.ner_type === 'regex') {
      if (!codeTextOutPutFromCodeEditor) {
        this.utilityService.showErrorToaster(`Syntax is not valid. ${this.ner_type} only accepts String`);
        return;
      }
    } else if (ner_type !== 'database') {

      if (!codeTextOutPutFromCodeEditor) {
        this.utilityService.showErrorToaster(`Syntax is not valid. ${this.ner_type} only accespts Array literal`);
        return;
      }

      try {
        outputData.codeTextOutPutFromCodeEditor = eval(codeTextOutPutFromCodeEditor);
      } catch (e) {
        this.utilityService.showErrorToaster('Syntax is not valid. Must be an an Array literal');
        return;
      }

    }
    this.updateOrSaveConcept$.emit(outputData);
  }


  createOutPutData() {
    let codeTextFromEditor;
    if (this.ner_type === 'regex') {
      // if (!this.codeTextOutPutFromCodeEditor) {
      //   this.utilityService.showErrorToaster(`Syntax is not valid. ${this.ner_type} only accepts String`);
      //   return;
      // }
      codeTextFromEditor = [this.codeTextOutPutFromCodeEditor];
    } else if (this.ner_type !== 'database') {
      try {

        // if (!this.codeTextOutPutFromCodeEditor) {
        //   this.utilityService.showErrorToaster(`Syntax is not valid. ${this.ner_type} only accespts Array literal`);
        //   return;
        // }
        // codeTextFromEditor = JSON.parse(this.codeTextOutPutFromCodeEditor);
        codeTextFromEditor = this.codeTextOutPutFromCodeEditor;
      } catch (e) {
        // codeTextFromEditor = this.codeTextOutPutFromCodeEditor;
        try {
          codeTextFromEditor = eval(this.codeTextOutPutFromCodeEditor);
        } catch (e) {
          this.utilityService.showErrorToaster('Syntax is not valid. Must be an an Array literal');
          return;
        }
      }
    }
    let tableData = this.handsontableData.filter((array :any)=>{
      return !!array.find(element => {return (element !== null) && (element !== undefined) && (element !== '')});
    });
    const outputData = {
      mode: this.ner_id ? 'Update' : 'Create',
      key: this.key || '',
      ner_type: this.ner_type,
      conflict_policy: this.conflict_policy,
      codeTextOutPutFromCodeEditor: codeTextFromEditor || '',
      handsontableData: tableData,
      //   ...this.handsontableComponent.getHotTableData(),
      process_raw_text: this.process_raw_text
    };
    const ner_id_str = this.activatedRoute.snapshot.queryParamMap.get('ner_id');
    if (ner_id_str) {
      outputData['id'] = Number(ner_id_str);
    }
    return outputData;
  }

  click() {
    LoggingService.log(this.form.value);
  }

  handsOnTableDataHasAtleastTwoRows() {

    return this.handsontableData && this.handsontableData.length > 2;
  }


  async goBack() {

    let isDirty: boolean = SideBarService.isKnowledgeBaseDirty();
    if(isDirty){
      let data =  await this.utilityService.openCloseWithoutSavingModal(this.dialogRefWrapper,this.matDialog);
      if(data){
        this.showTable$.emit();
        this._selectedRowData = {};
        EventService.createConceptFullScreen$.emit(false);
        SideBarService.resetKB();
      }
    }
    else{
      this.showTable$.emit();
      this._selectedRowData = {};
      EventService.createConceptFullScreen$.emit(false);
      SideBarService.resetKB();
    }
  }
  goBackWithoutModal(){
    EventService.kbRefresh$.emit();
    this.showTable$.emit();
    this._selectedRowData = {};
    EventService.createConceptFullScreen$.emit(false);
    SideBarService.resetKB();

  }

  ngAfterViewInit(): void {
    this.initialiseSideBarService();
  }

  initialiseSideBarService() {
    setTimeout(() => {
      SideBarService.knowledgeBaseInit(this);
    });
  }


}
