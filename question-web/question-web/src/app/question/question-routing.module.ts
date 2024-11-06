import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from './layouts/question/question.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'question',
    component: QuestionComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {
}
