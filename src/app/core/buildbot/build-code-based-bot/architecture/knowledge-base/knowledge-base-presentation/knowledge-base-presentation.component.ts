import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ICustomNerItem} from '../../../../../../../interfaces/custom-ners';
import {NgForm} from '@angular/forms';
import {UtilityService} from '../../../../../../utility.service';
import {ConstantsService} from '../../../../../../constants.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-knowledge-base-presentation',
  templateUrl: './knowledge-base-presentation.component.html',
  styleUrls: ['./knowledge-base-presentation.component.scss']
})

export class KnowledgeBasePresentationComponent implements OnInit {
  _selectedRowData: ICustomNerItem = {};
  @Input() set selectedRowData(value: ICustomNerItem) {

    if (!value) return;
    this._selectedRowData = value;
    debugger;
    this.key = value.key;
    if (value.ner_type)
      this.ner_type = value.ner_type;
    this.conflict_policy = value.conflict_policy;
    // this.codeTextInputToCodeEditor = value.values && value.values.join(',');
    // this.codeTextInputToCodeEditorObj.text = value.values && value.values.join(',');
    this.codeTextInputToCodeEditorObj.text = value.values && JSON.stringify(value.values);
    this.codeTextInputToCodeEditorObj = {...this.codeTextInputToCodeEditorObj};
    this.handontable_colHeaders = Object.keys(value.values[0]);
    for (let index = 0; index < this.handontable_colHeaders.length; index++) {
      this.handontable_column[index] = {
        data: index, type: 'text'
      } 
    }
  }

  @Input() handsontableData = ['', '', ''];
  @Output() updateOrSaveConcept$ = new EventEmitter();
  @Output() deleteNer$ = new EventEmitter();
  @Output() showTable$ = new EventEmitter();
  @ViewChild('form') form: NgForm;
  ner_id: string;
  key: string;
  routeName: string;
  ner_type: string = 'double_match';
  conflict_policy: string;
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
    private utilityService: UtilityService,
    public constantsService: ConstantsService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.routeName = this.activatedRoute.snapshot.data['routeName'];
    this.activatedRoute.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      this.ner_id = (<any>queryParamMap).params['ner_id'];
    });
  }

  async openFile(inputEl) {

    this.codeTextInputToCodeEditorObj.text = await this.utilityService.readInputFileAsText(inputEl);
    this.codeTextInputToCodeEditorObj = {...this.codeTextInputToCodeEditorObj};
  }

  textChanged(codeText) {
    this.codeTextOutPutFromCodeEditor = codeText;
  }

  updateOrSaveConcept() {

    let codeTextFromEditor;
    if (this.ner_type !=='database') {
      try {
        codeTextFromEditor = JSON.parse(this.codeTextOutPutFromCodeEditor);
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
    let outputData = {
      key: this.key,
      ner_type: this.ner_type,
      conflict_policy: this.conflict_policy,
      codeTextOutPutFromCodeEditor: codeTextFromEditor,
      handsontableData: this.handsontableData
    };
    let ner_id_str = this.activatedRoute.snapshot.queryParamMap.get('ner_id');
    if (ner_id_str)
      outputData['id'] = Number(ner_id_str);
    this.updateOrSaveConcept$.emit(outputData);
  }

}
