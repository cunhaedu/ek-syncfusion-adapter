// eslint-disable-next-line no-shadow
export enum FileStatusEnum {
  'IN_PROGRESS' = 1,
  'REQUESTED' = 2,
  'UNDER_ANALISES' = 3,
  'APPROVEMENT_EXPIRED' = 4,
  'PUBLICATION_EXPIRED' = 5,
  'REJECTED' = 6,
  'APPROVED' = 7,
}

export interface IDoctecFileStatusDTO {
  id: number;
  description: string;
}

export interface IDoctecFileVersionDTO {
  id: number;
  fileType: string | null;
}

export interface IDoctecFileDTO {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  isManagementDocument: boolean;
  isPublic: boolean;
  status: IDoctecFileStatusDTO;
  fileCode: string;
  currentVersion: IDoctecFileVersionDTO;
}
