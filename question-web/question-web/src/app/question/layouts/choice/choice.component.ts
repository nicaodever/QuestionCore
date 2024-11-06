import {Component, Input} from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Choice} from '../../models/choice';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent extends BaseComponent {
  @Input() choicesControl: AbstractControl;

  formGroup = this.fb.group({
    text: [null, Validators.required]
  });

  displayedColumns: string[] = ['choice_text', 'actions'];
  dataSource = new MatTableDataSource<Choice>();
  // tslint:disable-next-line:variable-name
  _selectedObj: Choice;

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    // initial data
    this.dataSource.data = this.choicesControl.value || [];

    // monitoring changes
    this.choicesControl.valueChanges
      .subscribe(data => this.dataSource.data = data || []);
  }

  // tslint:disable-next-line:typedef
  addOrEdit(choice?: Choice) {

    // choosing obj to edit
    if (choice) {
      this.reset(choice);
      return;
    }

    // store datasource
    const data = this.dataSource.data;

    // saving obj
    if (this._selectedObj) {
      data.map(t => {
        // tslint:disable-next-line:triple-equals
        if (t == this._selectedObj) {
          t.text = this.v.text;
        }
        return t;
      });
    } else {
      // adding new obj
      data.push(this.v);
    }

    // populate datasource and reset fields
    this.dataSource.data = data;
    this.choicesControl.setValue(data, {emitEvent: false});
    this.reset();
  }

  // tslint:disable-next-line:typedef
  reset(obj?: Choice) {
    this.f.text.setValue(obj?.text);
    this._selectedObj = obj;
  }

  // tslint:disable-next-line:typedef
  delete(obj: Choice) {
    // tslint:disable-next-line:triple-equals
    const data = this.dataSource.data.filter(t => t != obj);
    this.dataSource.data = data;
    this.choicesControl.setValue(data, {emitEvent: false});
  }
}
