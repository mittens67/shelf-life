export class EndingComponent {
  endingType: "good" | "neutral" | "bad";
  summary?: string;

  constructor(endingType: "good" | "neutral" | "bad", summary?: string) {
    this.endingType = endingType;
    this.summary = summary;
  }
}