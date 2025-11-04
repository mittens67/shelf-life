export class ChoiceComponent {
  choices: { label: string; nextNode: string }[];

  constructor(choices: { label: string; nextNode: string }[]) {
    this.choices = choices;
  }
}