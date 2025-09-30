import { IUser } from "../auth/auth.interface";

export interface IBlog {
  id: number;
  title: string;
  content: string;
  image?: string;
  authorId: number;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}
