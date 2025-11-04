export class MiniGameComponent {
  type: "card-match" | "wheel-of-fortune";
  theme?: string;
  cards?: string[];
  pairs?: number;
  scores?: Record<number, string>;
  outcomes?: Record<number, { endingNode: string }>;

  constructor(config: {
    type: "card-match" | "wheel-of-fortune";
    theme?: string;
    cards?: string[];
    pairs?: number;
    scores?: Record<number, string>;
    outcomes?: Record<number, { endingNode: string }>;
  }) {
    this.type = config.type; 
    this.theme = config.theme;
    this.cards = config.cards;
    this.pairs = config.pairs;
    this.scores = config.scores;
    this.outcomes = config.outcomes;
  }
}
