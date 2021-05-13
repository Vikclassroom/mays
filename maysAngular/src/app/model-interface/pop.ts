import {IAuthor} from './author';

export interface IPop {
  id: string;
  title: string;
  content: string;
  author: IAuthor;
  fileName: string;
  fileContent: string;
  isSpoiler: boolean;
}
