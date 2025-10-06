import { FileType } from '../enums/file-type.enum';

export interface FileInfo {
  name: string;
  type: FileType;
  size: number;
  creationDate: string;
  lastModified: string;
  path: string;
}
