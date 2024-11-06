import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirm-dialog',
  templateUrl: 'confirm.dialog.html',
  styleUrls: ['./confirm.dialog.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
