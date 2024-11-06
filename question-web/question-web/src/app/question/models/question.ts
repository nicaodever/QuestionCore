import {User} from '../../core/models/user';
import {Choice} from './choice';

export class Question {
  id?: number;
  text?: string;
  // tslint:disable-next-line:variable-name
  start_date?: Date;
  // tslint:disable-next-line:variable-name
  end_date?: Date;
  choices?: Choice[];

  // tslint:disable-next-line:variable-name
  constructor(text?: string, start_date?: Date, end_date?: Date, choices?: Choice[]) {
    this.text = text;
    this.start_date = start_date;
    this.end_date = end_date;
    this.choices = choices;
  }
}
