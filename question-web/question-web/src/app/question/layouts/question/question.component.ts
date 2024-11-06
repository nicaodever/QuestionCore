import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseComponent} from '../base.component';
import {QuestionService} from '../../services/question.service';
import {MatTableDataSource} from '@angular/material/table';
import {Question} from '../../models/question';
import {ToastrService} from 'ngx-toastr';
import {Choice} from '../../models/choice';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from '../../../shared/layouts/confirm-dialog/confirm.dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent extends BaseComponent {

  formGroup = this.fb.group({
    id: [null],
    text: ['Question', Validators.required],
    start_date: [moment().format('YYYY-MM-DD'), Validators.required],
    end_date: [moment().add(1, 'month').format('YYYY-MM-DD'), Validators.required],
    choices: [[]]
  });

  displayedColumns: string[] = ['id', 'text', 'start', 'end', 'actions'];
  dataSource = new MatTableDataSource<Question>();
  // tslint:disable-next-line:variable-name
  _selectedObj: Question;

  constructor(public fb: FormBuilder,
              public toast: ToastrService,
              public dialog: MatDialog,
              public questionService: QuestionService) {
    super(fb);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.list();
  }

  // tslint:disable-next-line:typedef
  formIsValid() {
    return this.formGroup.valid && this.v.choices?.length > 0;
  }

  // tslint:disable-next-line:typedef
  saveOrEdit(question?: Question) {
    // choosing obj to edit
    if (question) {
      this.reset(question);
      return;
    }

    // saving obj
    if (this._selectedObj) {
      this.questionService.update(this._selectedObj.id, this.v).subscribe(() => {
        this.toast.success('The question was changed!');
        this.list();
      });
    } else {
      this.questionService.create(this.v).subscribe(() => {
        this.toast.success('The question was saved!');
        this.list();
      });
    }
  }

  // tslint:disable-next-line:typedef
  delete(obj: Choice) {
    const config = {
      data: {title: 'Delete', message: 'Would you like to remove the selected question?'}
    };
    const dialogRef = this.dialog.open(ConfirmDialog, config);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }
      this.questionService.delete(obj.id).subscribe(() => {
        this.toast.success('The question was removed!');
      }, ex => null, () => this.list());
    });
  }

  // tslint:disable-next-line:typedef
  list() {
    this.questionService.all().subscribe(response => {
      this.dataSource.data = response;
      this.reset();
    });
  }

  // tslint:disable-next-line:typedef
  reset(question?: Question) {
    this._selectedObj = question;
    this.formGroup.reset(this._selectedObj);
  }
}
