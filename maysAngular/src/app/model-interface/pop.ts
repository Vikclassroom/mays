import {IAuthor} from './author';

export interface IPop {
  id: string;
  title: string;
  content: string;
  date: string;
  author: IAuthor;
  fileName: string;
  fileContent: string;
  isSpoiler: boolean;
  filePath: string;
  fileType: string;
  isLiked: boolean;
}
