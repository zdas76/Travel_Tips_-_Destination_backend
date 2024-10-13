import { Schema } from "mongoose";

interface IReplay {
  coment: string;
  name: string;
  email: string;
}

interface IComment {
  coment: string;
  name: string;
  email: string;
  replay?: IReplay[];
}

export interface TPost extends Document {
  userId: Schema.Types.ObjectId;
  category: string;
  title: string;
  description: string;
  image: string;
  comments?: IComment[];
  vote?: number;
  premium: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
