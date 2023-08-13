interface IUser {
  name?: string;
  image?: string;
}

interface IComment {
  user: IUser;
  comment: string;
}

export interface ICommentDocument extends Document {
  user: IUser;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
