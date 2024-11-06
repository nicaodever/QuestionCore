import {FormBuilder, FormGroup} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-base',
  template: '<div></div>'
})
export abstract class BaseComponent implements OnInit {
  formGroup: FormGroup;

  constructor(public fb: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // Convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  // Convenience getter for easy access to form fields values
  // tslint:disable-next-line:typedef
  get v() {
    return this.formGroup.value;
  }
}
