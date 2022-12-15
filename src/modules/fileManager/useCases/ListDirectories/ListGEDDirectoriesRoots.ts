import {
  IFileManagerDirectoryResponse,
  IFileManagerFile,
} from '@modules/fileManager/interfaces/IFileManager';
import { doctecApi } from '@shared/services/doctec/api';
import {
  DoctecRelationTypeEnum,
  IDoctecDirectoryDTO,
} from 'adapters/doctec/dtos/IDoctecDirectoryDTO';
import { doctecDirectoryMapper } from 'adapters/doctec/mappers/doctecDirectoryMapper';

export class ListGEDDirectoriesRoots {
  async execute(token: string): Promise<IFileManagerDirectoryResponse> {
    const doctecDirectories = await this.retrieveDoctecDirectories(token);

    return {
      cwd: {
        hasChild: doctecDirectories.length > 0,
        name: 'GED',
        size: 0,
        isFile: false,
        type: '',
        caseSensitive: false,
        filterId: 'ged',
        filterPath: 'ged',
        id: 'documents',
        permissions: {
          canCreateDirectoryChild: true,
          canMove: false,
          canEdit: false,
          canDelete: false,
          canCreateDocument: false,
          canRequestFile: false,
        },
      } as IFileManagerFile,
      files: doctecDirectories.map(directory => {
        return doctecDirectoryMapper(directory);
      }),
    };
  }

  private async retrieveDoctecDirectories(
    token: string,
  ): Promise<IDoctecDirectoryDTO[]> {
    const { data: response } = await doctecApi.get(
      `/directories/roots?relationType=${DoctecRelationTypeEnum.DIRECTORY}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response.data;
  }
}
