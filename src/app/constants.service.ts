import { Injectable } from '@angular/core';
import { IAppState } from './ngxs/app.state';
import { IUser } from './core/interfaces/user';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IBot } from './core/interfaces/IBot';
import { IIntegrationOption } from '../interfaces/integration-option';
import { IAuthState } from './auth/ngxs/auth.state';
import { ITableColumn } from '../interfaces/sessions';
import {environment} from '../environments/environment';
import {EAllActions} from "./typings/enum";
import { style } from '@angular/animations';

declare var Handsontable: any;

export const ERouteNames = EAllActions;

@Injectable()
export class ConstantsService {

  forbiddenPermsDynamic: { id?: string, name?: number };
  appState: IAppState;
  allowedPermissionIdsToCurrentRole: number[];
  static fullscreenchatpath_dev = (environment.production?'/static':'') + '/preview-dev';
  static fullscreenchatpath_anon = (environment.production?'/static':'') + '/preview';
  constructor() {
    console.log("environment=>>>", environment);
    this.app$.subscribe((appState) => {
      if (!appState) {
        return;
      }

      this.appState = appState;
      /*TODO: uncomment this*/
      // this.BACKEND_URL = (appState && appState.backendUrlRoot);
    });
    this.loggeduser$.subscribe((loggedUser: IAuthState) => {
      if (loggedUser && loggedUser.user) {
        this.loggedUser = loggedUser.user;
        ConstantsService.loggedUser_static = loggedUser.user;
        this.allowedPermissionIdsToCurrentRole = this.loggedUser.role.permissions.actions;
      }
    });
  }

  getIntegrationIconForChannelName(channelName: string): any {
    let x;
    let masterIntegrationList = this.appState.masterIntegrationList;
    try {
      x = masterIntegrationList.find((integrationMasterListItem) => {
        return integrationMasterListItem.key.toUpperCase() === channelName.toUpperCase();
      });
    } catch (e) {
      console.log(e);
    }
    return x;
  }
  getDefaultTriggeredRulesForArticleFilter(){
    return [
      "agent_handover",
      "downvoted",
      "fallback",
      "from_session",
      "low_confidence",
      "partial_match"
    ];
  }
  NEW_BOT_VERSION_TEMPLATE = {
    'bot_id': 0,
    'comment': '',
    'df_rules': '',
    'df_template': '',
    'generation_rules': '',
    'generation_templates': '',
    'id': -1,
    'workflow': '',
    'updated_fields': {
      'df_template': false,
      'df_rules': false,
      'generation_rules': false,
      'generation_template': false,
      'workflows': false
    },
    'forked_from': -1,
  };

  getNewBotVersionTemplate(botId: number) {
    this.NEW_BOT_VERSION_TEMPLATE.bot_id = botId;
    return this.NEW_BOT_VERSION_TEMPLATE;;
  }

  static state: any;
  loggedUser: IUser;
  static loggedUser_static: IUser;
  /*Todo: remove this.logged user and rename it*/
  @Select() app$: Observable<IAppState>;
  @Select() loggeduser$: Observable<{ user: IUser }>;

  public BACKEND_URL = environment.backend_root;// = environment.url;//'https://dev.imibot.ai/';//'http://10.0.27.176:8000/';
  public BACKEND_URL_LOGIN = `${this.BACKEND_URL}` + 'api/v1/user/login/';
  private BACKEND_URL_ENTERPRISE_USERS = `${this.BACKEND_URL}` + 'users/enterprise/';
  private BACKEND_USER_UPDATE_URL = `${this.BACKEND_URL}` + 'user/'; //https://dev.imibot.ai/user/5a030aa9b050705bd0ca5a45
  private BACKEND_USER_CODE_BASED_BOT_LIST = `${this.BACKEND_URL}` + 'integrations'; //https://dev.imibot.ai/integrations
  public BACKEND_USER_PIPELINE_BASED_BOT_LIST = `${this.BACKEND_URL}` + 'api/v1/bot/'; //https://dev.imibot.ai/bots

  public readonly CHANNEL_LIST = [
    { name: 'all', displayName: 'All Channels' },
    { name: 'facebook', displayName: 'Facebook' },
    { name: 'web', displayName: 'WebChat' },
    { name: 'alexa', displayName: 'Alexa' }];

  public readonly TIME_GRANULARITY_LIST = [
    { name: 'hour', displayName: 'Hour' },
    { name: 'day', displayName: 'Day' },
    { name: 'week', displayName: 'Week' },
    { name: 'month', displayName: 'Month' },
    { name: 'year', displayName: 'Year' }
  ];

  public readonly DATE_PICKER_CONFIG = Object.assign({}, {
    'containerClass': 'theme-dark-blue',
    'dateInputFormat': 'DD/MM/YYYY',
  });

  getEnterpriseLoginUrl() {
    return this.BACKEND_URL + 'api/v1/user/enterprise_login/';
  }

  generateServiceKeyUrl() {
    return this.BACKEND_URL + 'api/v1/enterprise/generate_service_key/?order_by=created_at';
  }
  disableServiceKeyUrl(){
    return this.BACKEND_URL + 'api/v1/enterprise/disable_service_key/?order_by=created_at';

  }
  getAllEnterpriseUrl() {
    return this.BACKEND_URL + 'api/v1/user/enterprises/';
  }

  getLoginUrl() {
    return this.BACKEND_URL + 'api/v1/user/login/';
  }

  sendEmailUrl() {
    return this.BACKEND_URL + 'api/v1/user/resetpasswordurl/';
  }

  resetPasswordUrl() {
    return this.BACKEND_URL + 'api/v1/user/resetpassword/';
  }

  codeValidationUrl() {
    return this.BACKEND_URL + 'api/v1/botversioning/codevalidation/';
  }

  getPipelineModuleV2() {
    return this.BACKEND_URL + 'api/v1/moduledetails/?limit=1000';
  }

  setLoggedUser(loggedUser: IUser) {
    this.loggedUser = loggedUser;
  }

  getSelectedVersionTemplate(botId) {
    return {
      'bot_id': botId,
      'comment': '',
      'created_at': '',
      'df_rules': '',
      'df_template': '#####DF Template Goes here####',
      'generation_rules': '',
      'generation_templates': '',
      'id': -1,
      'resource_uri': '',
      'updated_at': '',
      'version': null,
      'workflow': '',
      'updated_fields': {
        'df_template': false,
        'df_rules': false,
        'generation_rules': false,
        'generation_template': false,
        'workflows': false
      },
      'changed_fields': {
        'df_template': false,
        'df_rules': false,
        'generation_rules': false,
        'generation_template': false,
        'workflows': false
      },
      'validation': {
        'df_rules': { 'msg': 'You can validate your code' },
        'df_template': { 'msg': 'You can validate your code' },
        'generation_rules': { 'msg': 'You can validate your code' },
        'generation_templates': { 'msg': 'You can validate your code' },
        'workflow': { 'msg': 'You can validate your code' },
      },
      'forked_from': null,
    };
  }

  getUserUpdateUrl(enterprise_UserId: number) {
    return this.BACKEND_URL + `api/v1/user/${enterprise_UserId}/`; //{{url}}/user/{{Enterprise_UserId}}
  }

  getEnterpriseUrl(enterpriseId: number) {
    // return this.BACKEND_URL + `api/v1/enterprise/${enterpriseId}/`;// + enterpriseId+'/'; //https://dev.imibot.ai/enterprise/59b0f043378feb000d7c9d13
    return this.BACKEND_URL + `api/v1/enterprise/${enterpriseId}/`; // + enterpriseId+'/'; //https://dev.imibot.ai/enterprise/59b0f043378feb000d7c9d13
  }
  // getRoleUrl(){
  //   return this.BACKEND_URL + `api/v1/role/`; // + enterpriseId+'/'; //https://dev.imibot.ai/enterprise/59b0f043378feb000d7c9d13
  //
  // }
  getRoleByIdUrl(roleId : number){
    return this.BACKEND_URL + `api/v1/role/?id=${roleId}`; // + enterpriseId+'/'; //https://dev.imibot.ai/enterprise/59b0f043378feb000d7c9d13
  }

  getRoleIdUrl(roleId : number){
    return this.BACKEND_URL + `api/v1/role/${roleId}/`; // + enterpriseId+'/'; //https://dev.imibot.ai/enterprise/59b0f043378feb000d7c9d13
  }

  stopTestUrl() {
    return this.BACKEND_URL + `api/v1/bottestcases/canceltesting/`; // https://dev.imibot.ai/api/v1/bottestcases/canceltesting/

  }

  getEnterpriseUsersUrl() {
    return this.BACKEND_URL + 'api/v1/user/enterpriseusers/'; //https://dev.imibot.ai/api/v1/user/enterpriseusers/
  }

  getEnterpriseLogDeletionSummaryUrl() {
    return this.BACKEND_URL + 'api/v1/deletelogs/enterpriselogdeletionsummary/'; //https://dev.imibot.ai/api/v1/deletelogs/enterpriselogdeletionsummary/
  }
  getBotListUrl() {
    // return this.BACKEND_USER_PIPELINE_BASED_BOT_LIST + 'api/v1/bot/';
    return this.BACKEND_URL + 'api/v1/bot/?limit=1000';
  }
  getRoleUrl() {
    return this.BACKEND_URL + 'api/v1/role/';
  }
  deleteUserUrl(id:number){
    return this.BACKEND_URL + `api/v1/user/${id}/`;
  }
  removeEnterpriseUserUrl(){
    return this.BACKEND_URL + `api/v1/user/removeenterpriseuser/`;
  }
  createUserUrl(){
    return this.BACKEND_URL + `api/v1/user/`;
  }
  getLogoutUrl() {
    // http://localhost:8000/api/v1/logout/;
    return this.BACKEND_URL + 'api/v1/logout/';
  }
  updateUserUrl(user_id : number){
    return this.BACKEND_URL + `api/v1/user/${user_id}/`;

  }
  getNSetChatPreviewBotUrl(bot_unique_name, enterprise_unique_name) {
    // http://localhost:8000/api/v1/logout/;
    return this.BACKEND_URL + `api/v1/bot/preview/?bot_unique_name=${bot_unique_name}&enterprise_unique_name=${enterprise_unique_name}`;
  }
  getCorpusForFAQBot(bot_id){
    return this.BACKEND_URL + `api/v1/corpus/${bot_id}/`;
  }
  putCorpus(){
    return this.BACKEND_URL + `api/v1/corpus/`;
  }
  getLiveCorpus(){
    return this.BACKEND_URL + `api/v1/corpus/?state=live`;
  }
  getAllCorpusForFAQBot(limit,offset){
    return this.BACKEND_URL + `api/v1/corpus/?state__in=trained,live&limit=${limit}&offset=${offset}&order_by=-updated_at`;
  }
  getDraftCorpusForFAQBot(){
    return this.BACKEND_URL + `api/v1/corpus/getdefaultcorpus/`;
  }
  getUpdateAgentHandoverUrl(){
    return this.BACKEND_URL + `api/v1/bot/updateagenthandover/`;
  }
  getMasterIntegrationsList() {
    return this.BACKEND_URL + 'api/v1/integrations/';
  }

  getOverViewInfoUrl() {
    return this.BACKEND_URL + 'analytics/overviewinfo/'; //https://dev.imibot.ai/analytics/overviewinfo;
  }

  getUserAcquisitionUrl() {
    return this.BACKEND_URL + 'analytics/userAcquisition/'; //https://dev.imibot.ai/analytics/userAcquisition
  }

  getAverageRoomTimeUrl() {
    return this.BACKEND_URL + 'analytics/averageRoomTime/'; //https://dev.imibot.ai/analytics/averageRoomTime
  }

  getTotalFlowsUrl() {
    return this.BACKEND_URL + 'analytics/totalFlows/'; //https://dev.imibot.ai/analytics/totalFlows
  }

  getTotalSessionsUrl() {
    return this.BACKEND_URL + 'analytics/totalSessions/'; //https://dev.imibot.ai/analytics/totalSessions
  }

  getSessionsByIdUrl(id) {
    return this.BACKEND_URL + `api/v1/room/?id=${id}&order_by=-updated_at`; //https://dev.imibot.ai/api/v1/room/9913/
  }

  getSessionsMessageUrl(room_id: number) {
    return this.BACKEND_URL + `api/v1/message/?room_id=${room_id}&limit=1000&order_by=created_at`; //https://dev.imibot.ai/api/v1/message/?room_id=60
  }

  getTotalMessagesUrl() {
    return this.BACKEND_URL + 'analytics/totalMessages/'; //https://dev.imibot.ai/analytics/totalMessages
  }

  getMessagesByTemplateKeyUrl() {
    return this.BACKEND_URL + 'analytics/messagesByTemplateKey/'; //https://dev.imibot.ai/analytics/messagesByTemplateKey
  }

  /*analytics channel urls below*/
  getChannelWiseUsersUrl() {
    return this.BACKEND_URL + 'analytics/channelWiseUsers/'; //https://dev.imibot.ai/analytics/channelWiseUsers
  }

  getChannelWiseSessionsUrl() {
    return this.BACKEND_URL + 'analytics/channelWiseSessions/'; //https://dev.imibot.ai/analytics/channelWiseSessions
  }



  getChannelWiseFlowsPerSessionUrl() {
    return this.BACKEND_URL + 'analytics/channelWiseFlowsPerSession/'; //https://dev.imibot.ai/analytics/channelWiseFlowsPerSession
  }

  getChannelWiseAverageSessionTimeUrl() {
    return this.BACKEND_URL + 'analytics/channelWiseAverageSessionTime/'; //https://dev.imibot.ai/analytics/channelWiseAverageSessionTime
  }

  getReportUrl(limit = 1, offset = 10) {//limit: number, offset: number
    return this.BACKEND_URL + `api/v1/reports/?limit=${limit}&offset=${offset}&order_by=-created_at`; //{{url}}/reports?limit=1&offset=10
  }

  getReportHistoryUrl(limit = 1, offset = 10, order_by?) {
    return this.BACKEND_URL + `api/v1/reporthistory/?limit=${limit}&offset=${offset}&order_by=-created_at`;; //https://dev.imibot.ai/reporthistory?limit=1&offset=10
  }

  getReportDeleteUrl(report_id: number) {
    return this.BACKEND_URL + `api/v1/reports/${report_id}/`; //http://dev.imibot.ai/api/v1/reports/1/
  }

  getDownloadReportHistoryByIdUrl(id: number) {
    return this.BACKEND_URL + `api/v1/reporthistory/downloadreports/?id=${id}`; //http://localhost:8000/api/v1/reporthistory/downloadreports/?id=10
  }

  geReportTypesUrl() {
    return this.BACKEND_URL + 'api/v1/reporttypes/'; // http://dev.imibot.ai/api/v1/reporttypes
  }

  getReportsEditInfo(_id) {
    return this.BACKEND_URL + 'api/v1/reports/' + _id + '/'; //  https://dev.imibot.ai/reports/5b335b127c15580059c13fc5
  }

  getSaveReportsEditInfo(_id) {
    return this.BACKEND_URL + `api/v1/reports/${_id}/`; //  http://dev.imibot.ai/api/v1/reports/1/
  }


  getCreateReportUrl() {
    return this.BACKEND_URL + `api/v1/reports/`; //  http://dev.imibot.ai/api/v1/reports
  }


  getAllVersionsByBotId() {
    return this.BACKEND_URL + 'api/v1/botversioning/?limit=1000'; //"http://localhost:8000/api/v1/botversioning"
  }

  getSaveVersionByVersionId(id) {
    return this.BACKEND_URL + `api/v1/botversioning/${id}/`; //https://dev.imibot.ai/api/v1/botversioning/9/
  }
  getSaveVersionByBotId(id) {
    return this.BACKEND_URL + `api/v1/botversioning/${id}/`; //https://dev.imibot.ai/api/v1/botversioning/9/
  }
  getCreateNewVersionByBotId(id) {
    return this.BACKEND_URL + `api/v1/botversioning/`; //https://dev.imibot.ai/api/v1/botversioning/9/
  }

  getCreateNewBot() {
    return this.BACKEND_URL + `api/v1/bot/`; //https://dev.imibot.ai/api/v1/bot/
  }


  getBotTestingUrl() {
    return this.BACKEND_URL + 'api/v1/bottestcases/'; //https://dev.imibot.ai/api/v1/bottestcases/
  }

  getBotConsumerUrl(limit: number, offset: number) {
    return this.BACKEND_URL + `api/v1/consumer/?limit=${limit}&offset=${offset}&order_by=-id`; //https://localhost:8000/api/v1/consumer/?limit=1&offset=0
  }

  getBotConsumerByIdUrl(id: number) {
    return this.BACKEND_URL + `api/v1/consumer/?id=${id}`; //https://dev.imibot.ai/api/v1/consumer/2320/
  }

  getAllActionsUrl() {
    return this.BACKEND_URL + `api/v1/actions/?limit=1000`; //https://dev.imibot.ai/api/v1/actions/
  }

  getChatFeedbackUrl() {
    return this.BACKEND_URL + 'api/v1/message/feedback/';
  }

  appendQueryParamsInUrl(url: string, queryParams: object) {
    let urlObj = new URL(url);
    for (let key in queryParams) {
      urlObj.searchParams.append(key, queryParams[key]);
    }
    return urlObj.href
  }

  getRoomWithFilters(queryParams: object) {
    let url = this.BACKEND_URL + 'api/v1/room/?order_by=-updated_at';
    let urlWithQueryParams = this.appendQueryParamsInUrl(url, queryParams);
    return urlWithQueryParams;
  }

  getDeleteBotUrl(id: number) {
    return this.BACKEND_URL + `api/v1/bot/${id}/`; //http://localhost:8000/api/v1/bot/66/
  }

  getDecryptUrl() {
    return this.BACKEND_URL + `api/v1/decrypt_audit/`; ///api/v1/decrypt_audit/
  }

  getSpecificBotByBotTokenUrl() {
    return this.BACKEND_URL + `api/v1/bot/?limit=1000`; //https://dev.imibot.ai/api/v1/bot/
  }

  getBotSessionsUrl(limit: number, offset: number) {
    return this.BACKEND_URL + `api/v1/room/?limit=${limit}&offset=${offset}&order_by=-updated_at`; //https://dev.imibot.ai/aip/v1/room
  }

  getStartNewChatLoginUrl() {
    return this.BACKEND_URL + 'api/v1/webhook/web/'; //'send';
  }

  getAllBotVersionByBotIdUrl(bot_id) {
    return this.BACKEND_URL + `api/v1/botversioning/?bot_id=${bot_id}`; //http://localhost:8000/api/v1/botversioning/?bot_id=2
  }

  getCustomBotNER(limit, offset) {
    return this.BACKEND_URL + `api/v1/customner/?limit=${limit}&offset=${offset}&order_by=-updated_at`; //https://dev.imibot.ai/api/v1/customner/
  }

  updateOrDeleteCustomBotNER(custom_ner_id) {
    return this.BACKEND_URL + `api/v1/customner/${custom_ner_id}/`; //https://dev.imibot.ai/api/v1/customner/13/
  }

  updateBotUrl(bot_id: number) {
    return this.BACKEND_URL + `api/v1/bot/${bot_id}/`; //https://dev.imibot.ai/api/v1/bot/13/
  }

  createNewCustomBotNER() {
    return this.BACKEND_URL + `api/v1/customner/`; //https://dev.imibot.ai/api/v1/customner/
  }

  /*Pipeline*/
  getAllPipelineModuleUrl() {
    return this.BACKEND_URL + `api/v1/pipelinemodule/?limit=200&offset=0`; //https://dev.imibot.ai/api/v1/pipelinemodule/
  }

  /*Enterprise NER*/
  getEnterpriseNer(limit: number = 10, offset: number = 0) {
    return this.BACKEND_URL + `api/v1/customner/?type=enterprise&limit=${limit}&offset=${offset}&order_by=-updated_at`; //https://dev.imibot.ai/api/v1/customner/
  }

  getEnterpriseNerById(id) {
    return this.BACKEND_URL + `api/v1/customner/?type=enterprise&id=${id}`; //https://dev.imibot.ai/api/v1/customner/
  }

  getCustomNerById(id) {
    return this.BACKEND_URL + `api/v1/customner/?id=${id}`; //dev.imibot.ai/api/v1/customner/?roomId=13
  }

  getAnalyticsUrl() {
    return this.BACKEND_URL + 'api/v1/analytics/'; //https://dev.imibot.ai/api/v1/analytics/
  }

  updateOrDeleteEnterpriseNer(id) {/*TODO: is it enterprise roomId??*/
    return this.BACKEND_URL + `api/v1/customner/${id}/`; //https://dev.imibot.ai/api/v1/customner/12/
  }

  createEnterpriseNer() {
  }

  updatePassword() {
    return this.BACKEND_URL + 'api/v1/user/updatepassword/'; //https:dev.imibot.ai/api/v1/user/updatepassword///
  }

  updateArticelUrl(){
    return this.BACKEND_URL + `api/v1/corpus/updatesection/`;
  }
  createArticelUrl(){
    return this.BACKEND_URL + `api/v1/corpus/createsection/`;
  }
  deleteArticelUrl(){
    return this.BACKEND_URL + `api/v1/corpus/removesection/`;
  }

  updateCategoryUrl(){
    return this.BACKEND_URL + `api/v1/corpus/updatecategory/`;
  }
  createCategoryUrl(){
    return this.BACKEND_URL + `api/v1/corpus/createcategory/`;
  }
  deleteCategoryUrl(){
    return this.BACKEND_URL + `api/v1/corpus/removecategory/`;
  }
  changeSectionCategoryUrl(){
    return this.BACKEND_URL + `api/v1/corpus/changesectioncategory/`;
  }
  changeSectionCategoryWithNewCategoryUrl(){
    return this.BACKEND_URL + `api/v1/corpus/createcategoryandmaptosection/`;
  }

  corpusTrainUrl(){
    return this.BACKEND_URL + `api/v1/corpus/train/`;
  }

  makeCorpusLiveUrl(){
    return this.BACKEND_URL + `api/v1/corpus/makecorpuslive/`;
  }

  curationIssuesListUrl(limit,offset){
    return this.BACKEND_URL + `api/v1/faqbotcuration/?curation_state__in=in_curation&limit=${limit}&offset=${offset}`;
  }
  curationResolvedAndIgnoredListUrl(limit,offset){
    return this.BACKEND_URL + `api/v1/faqbotcuration/?limit=${limit}&offset=${offset}`;
  }
  curationIssueIgnoreUrl(){
    return this.BACKEND_URL + `api/v1/faqbotcuration/ignore/`;
  }
  curationIssueLinkToExistingSectionUrl(){
    return this.BACKEND_URL + `api/v1/faqbotcuration/linktoexistingsection/`;
  }
  addCurationToNewSection(){
    return this.BACKEND_URL + `api/v1/faqbotcuration/addtonewsection/`;
  }
  getAggregationResolved(){
    return this.BACKEND_URL + `api/v1/faqbotcuration/aggregationcounts/?curation_state=resolved,ignored`;
  }
  getAggregationIssues(){
    return this.BACKEND_URL + `api/v1/faqbotcuration/aggregationcounts/?curation_state=in_curation`
  }
  getTopArticlesWithIssues(){
    return this.BACKEND_URL + `api/v1/faqbotcuration/topsectionissues/`;
  }
  addMessageToCurationFromSession(){
    return this.BACKEND_URL + `api/v1/message/addmessagetofaqbotcuration/`
  }
  updateBotSerializer(bot: IBot) {
    const clone = { ...bot };
    const not_keys = [
      'bot_access_token',
      'created_at',
      'created_by',
      'enterprise_id',
      'id',
      'store_bot_versions',
      'updated_at',
      'updated_by'
    ];
    not_keys.forEach((key) => {
      delete clone[key];
    });
    return clone;
  }


  //localstorage keys
  LOCALSTORAGE_APP_STATE = 'LOCALSTORAGE_APP_STATE';
  LOCALSTORAGE_LAST_STATE_UPDATED = 'LOCALSTORAGE_LAST_STATE_UPDATED';


  readonly HANDSON_TABLE_BOT_TESTING_colHeaders = ['Message', 'Expected Template', 'Status', 'Generated Template', 'RoomId', 'TransactionId'];
  readonly HANDSON_TABLE_BOT_TESTING_columns = [
    { data: 0, type: 'text', },
    { data: 1, type: 'text', },
    { data: 2, type: 'text', readOnly: true },
    { data: 3, type: 'text', readOnly: true },
    { data: 4, type: 'text', readOnly: true },
    { data: 5, type: 'text', readOnly: true },
  ];

  readonly HANDSON_TABLE_KNOWLEDGE_BASE_SETTING = {
    cells: function (row, col) {

      /*To make first row highlighted*/
      /*https://docs.handsontable.com/5.0.2/demo-conditional-formatting.html*/
      const cellProperties = {};
      // var data = this.instance.getData();


      if (row === 0) {
        cellProperties['renderer'] = function (instance, td, row, col, prop, value, cellProperties) {
          Handsontable.renderers.TextRenderer.apply(this, arguments);
          td.style.fontWeight = 'bold';
        }; // uses function directly
      }
      return cellProperties;
    }
  };
  readonly HANDSON_TABLE_KNOWLEDGE_BASE_colHeaders = ['', '', ''];
  readonly HANDSON_TABLE_KNOWLEDGE_BASE_columns = [
    // {data: 0, type: 'text'},
    // {data: 1, type: 'text'},
    // {data: 2, type: 'text'},
    // {data: 3, type: 'text'},
    // {data: 4, type: 'text'},
    // {data: 5, type: 'text'}
  ];

  readonly SMART_TABLE_REPORT_TABLE_DATA_META_DICT_TEMPLATE = {
    isactive: {
      originalKey: 'isactive',
      value: '',
      type: 'string',
      displayValue: 'Active',
      search: true,
      searchValue: true,
    },
    bot: {
      originalKey: 'bot',
      value: '',
      type: 'string',
      displayValue: 'Bot',
      search: true,
      searchValue: true,
    },

    name: {
      originalKey: 'name',
      value: '',
      type: 'string',
      displayValue: 'Report Type',
      search: true,
      searchValue: true,
    },
    frequency: {
      originalKey: 'frequency',
      value: '',
      type: 'string',
      displayValue: 'Frequency',
      search: true,
      searchValue: true,
    },
    lastreportgenerated: {
      originalKey: 'lastreportgenerated',
      value: '',
      type: 'time',
      displayValue: 'Last report generated',
      search: false,
      searchValue: "",
      dateRange: true
    },
    nextreportgenerated: {
      originalKey: 'nextreportgenerated',
      value: '',
      type: 'time',
      displayValue: 'Next scheduled date',
      search: false,
      searchValue: "",
      dateRange: true
    },
  };
  readonly SMART_TABLE_REPORT_HISTORY_TABLE_DATA_META_DICT_TEMPLATE = {

    bot: {
      originalKey: 'bot',
      value: '',
      type: 'string',
      displayValue: 'Bot',
      search: true,
      searchValue: true,
    },

    name: {
      originalKey: 'name',
      value: '',
      type: 'string',
      displayValue: 'Report Type',
      search: true,
      searchValue: true,
    },
    created_at: {
      originalKey: 'created_at',
      value: '',
      type: 'time',
      displayValue: 'Generated Date',
      search: false,
      searchValue: "",
      dateRange: true
    },
    actions: {
      originalKey: '',
      value: undefined,
      type: 'mat-icon',
      displayValue: 'Actions',
      custom: true,
      name: '',
      search: false,
      searchValue: true,
    },

  };
  readonly HIGHCHART_THEMEVALUE_ANALYTICS_PERFORMANCE_SESSION_WISE = {
    chart: {
      style: {
        fontFamily: 'helvetica'
      }
    },
    colors: ['#5392ff', '#71cddd', '#34bc6e', '#95d13c', '#ffb000', '#fe8500', '#ff509e', '#9b82f3']
  };
  readonly HIGHCHART_THEMEVALUE_ANALYTICS_PERFORMANCE_TEMPLATE_KEY_AND_FLOW_TRIGGERED = {
    chart: {
      style: {
        fontFamily: 'helvetica'
      }
    },
    colors: ['#5392ff', '#71cddd', '#34bc6e', '#95d13c', '#ffb000', '#fe8500', '#ff509e', '#9b82f3']
  };
  SMART_TABLE_ENTERPRISE_NER_TABLE_DATA_META_DICT_TEMPLATE: ITableColumn = {
    key: {
      originalKey: 'key',
      value: '',
      type: 'string',
      displayValue: 'Concept name',
      search: true,
      searchValue: true,
    },
    ner_type: {
      originalKey: 'ner_type',
      value: '',
      type: 'string',
      displayValue: 'Concept type',
      search: true,
      searchValue: true,
    },
    updated_at: {
      originalKey: 'updated_at',
      value: '',
      type: 'time',
      displayValue: 'Last Update',
      search: false,
      searchValue: true,
      dateRange: true
    },

  };

  SMART_TABLE_BOT_KNOWLEDGE_BASE_NER_TABLE_DATA_META_DICT_TEMPLATE: ITableColumn = {
    key: {
      originalKey: 'key',
      value: '',
      type: 'string',
      displayValue: 'Concept name',
      search: true,
      searchValue: true,
    },
    ner_type: {
      originalKey: 'ner_type',
      value: '',
      type: 'string',
      displayValue: 'Concept type',
      search: true,
      searchValue: true,
    },
    conflict_policy: {
      originalKey: 'conflict_policy',
      value: '',
      type: 'string',
      displayValue: 'Override policy',
      search: true,
      searchValue: true,
    },
    updated_at: {
      originalKey: 'updated_at',
      value: '',
      type: 'time',
      displayValue: 'Last Update',
      search: false,
      searchValue: true,
      dateRange: true
    },


  };
  SMART_TABLE_SESSION_TABLE_DATA_META_DICT_TEMPLATE: ITableColumn = {

    channels: {
      originalKey: '',
      value: '',
      type: 'image',
      displayValue: 'Channels',
      search: false,//true,
      searchValue: true,
    },
    id: {
      originalKey: 'id',
      value: '',
      type: 'number',
      displayValue: 'ID',
      search: false,//true,
      searchValue: true,
    },
    consumer_id: {
      originalKey: 'consumer_id',
      value: '',
      type: 'number',
      displayValue: 'Consumer ID',
      search: false,//true,
      searchValue: true,
    },
    // sendtoagent: {
    //   originalKey: '',
    //   value: '',
    //   type: 'boolean',
    //   displayValue: 'Send to agent',
    //   search: true,
    //   searchValue: true,
    // },
    total_message_count: {
      originalKey: '',
      value: '',
      type: 'number',
      displayValue: 'Messages',
      search: false,//true,
      searchValue: true,
    },
    updated_at: {
      originalKey: '',
      value: '',
      type: 'time',
      displayValue: 'Updated At',
      search: false,//true,
      searchValue: true,
      dateRange: false//true
    },
    room_metadata: {
      originalKey: '',
      value: undefined,
      type: 'mat-icon',
      displayValue: 'Metadata',
      custom: true,
      name: '',
      search: false,
      searchValue: true,
    },
  };

  readonly SMART_TABLE_ENTERPISE_USERS_SETTING = {

    columns: {
      first_name: {
        title: 'First Name'
      },
      email: {
        title: 'Email'
      },
      // 'messages.length': {
      //   title: 'Messages'
      // },
      'role': {
        title: 'Role'
      },
      'permissions': {
        title: 'Permissions'
      }
      , created_at: {
        title: 'Created At'
      },
      updated_at: {
        title: 'Updated At'
      }
    },
    // hideSubHeader: true
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: false,
      perPage: 5
    }
  };
  readonly SMART_TABLE_SERVICE_KEY_EXPIRED: any = {
    key: {
      originalKey: 'key',
      value: '',
      type: 'string',
      displayValue: 'Token Id',
    },
    description: {
      originalKey: 'description',
      value: '',
      type: 'string',
      displayValue: 'Description',
    },
    created_at: {
      originalKey: 'created_at',
      value: '',
      type: 'string',
      displayValue: 'Created on',
    },
    expired_at: {
      originalKey: 'expired_at',
      value: '',
      type: 'string',
      displayValue: 'Expires on',
    },
    expired_by: {
      originalKey: 'expired_by',
      value: '',
      type: 'string',
      displayValue: 'Expired by',
    }

  }

  readonly SMART_TABLE_SERVICE_KEY_ACTIVE: any = {
    key: {
      originalKey: 'key',
      value: '',
      type: 'string',
      displayValue: 'Token Id',
    },
    description: {
      originalKey: 'description',
      value: '',
      type: 'string',
      displayValue: 'Description',
    },
    created_at: {
      originalKey: 'created_at',
      value: '',
      type: 'string',
      displayValue: 'Created on',
    },
    // expired_at: {
    //   originalKey: 'expired_at',
    //   value: '',
    //   type: 'string',
    //   displayValue: 'Expires on',
    // },
    'actions': {
      originalKey: '',
      value: undefined,
      type: 'icon',
      displayValue: 'Actions',
      custom: true,
      name: '',

    }

  }

  SMART_TABLE_USER_DICT_TEMPLATE: ITableColumn = {
    first_name: {
      originalKey: 'first_name',
      value: '',
      type: 'number',
      displayValue: 'User Name',

    },
    email: {
      originalKey: 'email',
      value: '',
      type: 'number',
      displayValue: 'Email ID',

    },
    // 'role': {
    //   originalKey: 'role',
    //   value: '',
    //   type: 'number',
    //   displayValue: 'Role',
    //   search: true,
    //   searchValue: true,
    // },
    'role_id': {
      originalKey: 'role_id',
      value: '',
      type: 'string',
      displayValue: 'Role',

    },
    'bots': {
      originalKey: 'bots',
      value: '',
      type: 'string',
      displayValue: 'Bots assigned',

    },
    'actions': {
      originalKey: '',
      value: undefined,
      type: 'icon',
      displayValue: 'Actions',
      custom: true,
      name: '',

    }
    // 'permissions': {
    //   originalKey: 'permissions',
    //   value: '',
    //   type: 'number',
    //   displayValue: 'Permissions',
    //   search: true,
    //   searchValue: true,
    // },
    // updated_at: {
    //   originalKey: 'updated_at',
    //   value: '',
    //   type: 'number',
    //   displayValue: 'Updated At',
    //   search: true,
    //   searchValue: true,
    // },
  };
  SMART_TABLE_CONSUMER_TABLE_DATA_META_DICT_TEMPLATE: ITableColumn = {
    id: {
      originalKey: 'id',
      value: '',
      type: 'number',
      displayValue: 'ID',
      search: true,
      searchValue: true,
    },
    name: {
      originalKey: '',
      value: '',
      type: 'number',
      displayValue: 'Name',
      search: true,
      searchValue: true,
    },
    phone: {
      originalKey: '',
      value: '',
      type: 'number',
      displayValue: 'Phone',
      search: true,
      searchValue: true,
    },
    facebook_id: {
      originalKey: 'facebook_id',
      value: '',
      type: 'number',
      displayValue: 'Facebook ID',
      search: true,
      searchValue: true,
    },
    skype_id: {
      originalKey: 'skype_id',
      value: '',
      type: 'number',
      displayValue: 'Skype ID',
      search: true,
      searchValue: true,
    },
    uid: {
      originalKey: 'uid',
      value: '',
      type: 'number',
      displayValue: 'UID',
      search: true,
      searchValue: true,
    },
    email: {
      originalKey: 'email',
      value: '',
      type: 'string',
      displayValue: 'Email',
      search: true,
      searchValue: true,
    },
    updated_at: {
      originalKey: 'updated_at',
      value: '',
      type: 'time',
      displayValue: 'Updated At',
      search: false,
      searchValue: false,
      dateRange: true
    },
    actions: {
      originalKey: '',
      value: undefined,
      type: 'mat-icon',
      displayValue: 'Actions',
      custom: true,
      name: '',
      search: false,
      searchValue: false,
    },
  };


  SMART_TABLE_ARTICLE_HISTORY_TEMPLATE: ITableColumn = {
    description: {
      originalKey: 'description',
      value: '',
      type: 'string',
      displayValue:'Description of trained knowledge base',

    },
    updated_at: {
      originalKey: 'updated_at',
      value: '',
      type: 'string',
      displayValue: 'Updated on',
    },
    'actions': {
      originalKey: '',
      value: '',
      type: 'string',
      displayValue: 'Actions',
    }
  };

}
