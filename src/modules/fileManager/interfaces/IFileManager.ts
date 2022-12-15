export interface IFileManagerFilePermissions {
  canMove: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canReviewDocument: boolean;
  canRelateDocuments: boolean;
  canSendFile: boolean;
  canRequestPublication: boolean;
}

export interface IFileManagerDirectoryPermissions {
  canCreateDirectoryChild: boolean;
  canMove: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreateDocument: boolean;
  canRequestFile: boolean;
}

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
  permissions: IFileManagerDirectoryPermissions | IFileManagerFilePermissions;
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
  data: IFileManagerFile[];
}
