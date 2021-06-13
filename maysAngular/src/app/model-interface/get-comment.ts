import {IAuthor} from './author';
import {IPost} from './post';

export interface IGetComment {
  id: string;
  date: string;
  post: IPost;
  author: IAuthor;
  content: string;
  isSpoiler: boolean;
}
