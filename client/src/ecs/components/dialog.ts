export class DialogueComponent {
  lines: string[];
  currentLine: number;

  constructor(lines: string[]) {
    this.lines = lines;
    this.currentLine = 0;
  }
}