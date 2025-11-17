import mongoose, { Schema, Document } from "mongoose";

export interface IEntity extends Document {
  id: string;
  components: {
    dialogue?: { lines: string[] };
    choice?: { options: { label: string; nextNode: string }[] };
    asset?: { image: string; music: string };
    metadata?: { id: string; type: string };
    miniGame?: {
      type: "card-match" | "wheel-of-fortune";
      // card-match fields
      theme?: string;
      cards?: string[];
      pairs?: number;
      scores?: Record<number, string>;
      // wheel-of-fortune fields
      outcomes?: Record<number, { endingNode: string }>;
    };
  };
}

const entitySchema = new Schema<IEntity>(
  {
    id: { type: String, required: true, unique: true },
    components: {
      dialogue: {
        lines: [{ type: String }],
      },
      choice: {
        options: [
          {
            label: { type: String },
            nextNode: { type: String },
          },
        ],
      },
      asset: {
        image: { type: String },
        music: { type: String },
      },
      ending: { type: String },
      metadata: {
        id: { type: String },
        type: { type: String },
      },
      miniGame: {
        type: { type: String, enum: ["card-match", "wheel-of-fortune"] },
        theme: { type: String },
        cards: [{ type: String }],
        pairs: { type: Number },
        scores: { type: Map, of: String },
        outcomes: { type: Map, of: { endingNode: String } },
      }, // flexible placeholder
    },
  },
  { timestamps: true }
);

export const EntityModel = mongoose.model<IEntity>("Entity", entitySchema);
