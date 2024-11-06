import {NgModule} from '@angular/core';
import {QuestionComponent} from './layouts/question/question.component';
import {AuthService} from '../core/services/auth.service';
import {ChoiceComponent} from './layouts/choice/choice.component';
import {QuestionService} from './services/question.service';
import {SharedModule} from '../shared/shared.module';
import {QuestionRoutingModule} from './question-routing.module';

@NgModule({
  declarations: [
    QuestionComponent,
    ChoiceComponent,
  ],
  imports: [
    QuestionRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    QuestionService,
  ],
})
export class QuestionModule {
}
