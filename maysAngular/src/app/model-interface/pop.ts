import {IAuthor} from './author';

export interface IPop {
  id: number;
  title: string;
  date: string;
  author: IAuthor;
  content: string;
  file: string;
  filePath: string;
  isSpoiler: boolean;
}
