import { IDoctecFileDTO } from './IDoctecFileDTO';

// eslint-disable-next-line no-shadow
export enum DoctecRelationTypeEnum {
  DIRECTORY = 1,
  PROVIDER = 2,
  ASSET = 3,
}

export interface IDoctecRelationTypeDTO {
  id: number;
  description: string;
}

export interface IDirectoryUserPermissions {
  canCreateDirectoryChild: boolean;
  canMove: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreateDocument: boolean;
  canRequestFile: boolean;
}

export interface IDoctecDirectoryDTO {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  description: string;
  isPublic: boolean;
  hasChildren: boolean;
  relationType: IDoctecRelationTypeDTO;
  files: IDoctecFileDTO[];
  permissions: IDirectoryUserPermissions;
}
