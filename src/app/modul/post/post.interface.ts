import { Schema } from "mongoose";

export interface IReplay {
  comment: string;
  userId: Schema.Types.ObjectId;
}

export interface IComment {
  comment: string;
  userId: Schema.Types.ObjectId;
  replay?: IReplay[];
}

export interface TPost extends Document {
  userId: Schema.Types.ObjectId;
  category: string;
  title: string;
  description: string;
  image: string;
  comments?: IComment[];
  vote: [
    {
      value: string;
      user: Schema.Types.ObjectId;
    }
  ];

  premium: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
