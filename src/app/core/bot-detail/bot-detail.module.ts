import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsDropdownModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {DragAndDropModule} from 'angular-draggable-droppable';
// import {NgxsModule} from '@ngxs/store';
// import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
// import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
// import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {HttpClientModule} from '@angular/common/http';
import {Ng2CompleterModule} from 'ng2-completer';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {DragService} from '../../drag.service';
import {AimService} from '../../aim.service';
import {SortObjectArrayPipe} from '../../sort-object-array.pipe';
import {SharedModule} from '../../shared.module';
import {PipelineBasedBotDetailComponent} from './pipeline-based-bot-detail/pipeline-based-bot-detail.component';
import {CodeBasedBotDetailComponent} from './code-based-bot-detail/code-based-bot-detail.component';
import {BotDetailHeaderComponent} from './bot-detail-header/bot-detail-header.component';
import {BotDetailWrapperComponent} from './bot-detail-wrapper.component';
import {BotTestingComponent} from './bot-testing/bot-testing.component';
import {BotSessionsComponent} from './bot-sessions/bot-sessions.component';
import {SessionDetailModelComponent} from './bot-sessions/session-detail-model/session-detail-model.component';
import {ConsumersComponent} from './consumers/consumers.component';
import {SessionMessageComponent} from './bot-sessions/session-detail-model/session-message/session-message.component';
import {SessionTabsDetailsComponent} from './bot-sessions/session-detail-model/session-tabs-details/session-tabs-details.component';
import {PipelineFilterPipe} from '../../pipeline-filter.pipe';
import {SessionComponent} from './session/session.component';
import {PipelineComponent} from '../buildbot/build-code-based-bot/architecture/pipeline/pipeline.component';
import {CodeInputComponent} from '../buildbot/build-code-based-bot/architecture/code/code-input/code-input.component';
import {IntegrationOptionListComponent} from '../buildbot/build-code-based-bot/architecture/integration/integration-option-list/integration-option-list.component';
import {IntegrationItemComponent} from '../buildbot/build-code-based-bot/architecture/integration/integration-item/integration-item.component';
import {DraggableDirective} from '../../draggable.directive';
import {DropTargetDirective} from '../../drop-target.directive';
import {KnowledgeBaseWrapperComponent} from '../buildbot/build-code-based-bot/architecture/knowledge-base-wrapper/knowledge-base-wrapper.component';

const routes: Route[] = [
  {
    path: '', component: BotDetailWrapperComponent, children:
      [
        {path: 'codebased/:id', component: CodeBasedBotDetailComponent},
        {path: 'intelligent/:id', component: PipelineBasedBotDetailComponent},
      ]
  }
];

@NgModule({
  declarations: [
    CodeBasedBotDetailComponent,
    PipelineBasedBotDetailComponent,
    BotDetailHeaderComponent,
    BotDetailWrapperComponent,
    BotTestingComponent,
    BotSessionsComponent,
    SessionDetailModelComponent,
    ConsumersComponent,
    SessionDetailModelComponent,
    SessionTabsDetailsComponent,
    SessionMessageComponent,
    PipelineComponent,
    PipelineFilterPipe,
    SessionComponent,
    CodeInputComponent,
    IntegrationOptionListComponent,
    IntegrationItemComponent,
    DraggableDirective,
    DropTargetDirective,
    KnowledgeBaseWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    DragAndDropModule.forRoot(),
    // NgxsModule.forFeature([]),
    SharedModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
  ],
  providers: [DragService, AimService]
})
export class BotDetailModule {

}
