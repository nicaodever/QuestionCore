import {Question} from './question';

export class Choice {
  id?: number;
  text?: string;
  votes?: number;
  question?: Question;

  constructor(text?: string) {
    this.text = text;
  }
}
