import {IAuthor} from './author';

export interface IPost {
  id: string;
  title: string;
  date: string;
  author: IAuthor;
  content: string;
  filePath: string;
  fileType: string;
  isSpoiler: boolean;
  countLikes: number;
  countComment: number;
  isLiked: boolean;
}
