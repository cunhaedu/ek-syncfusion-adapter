export interface IFileManagerFile {
  caseSensitive: boolean;
  dateCreated: string;
  dateModified: string;
  filterId: number | string;
  filterPath: string | number;
  hasChild: boolean;
  id: string | number;
  isFile: boolean;
  isRoot: boolean;
  name: string;
  parentId: number | string;
  selected: boolean;
  showHiddenItems: boolean;
  size: number;
  type: 'folder' | string;
  code: string;
  status: string;
}

// eslint-disable-next-line no-shadow
export enum FileManagerActionEnum {
  'READ' = 'read',
}

export interface IFileManagerDirectoryResponse {
  cwd: IFileManagerFile;
  files: IFileManagerFile[];
}

export interface IFileManagerRequest {
  action: FileManagerActionEnum;
  path: string;
  data: any;
}
