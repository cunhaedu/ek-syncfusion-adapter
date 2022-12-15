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

export class ListAssetDirectoriesRoots {
  async execute(token: string): Promise<IFileManagerDirectoryResponse> {
    const doctecDirectories = await this.retrieveDoctecDirectories(token);

    return {
      cwd: {
        hasChild: doctecDirectories.length > 0,
        name: 'Ativos',
        size: 0,
        isFile: false,
        type: '',
        caseSensitive: false,
        filterId: 'assets',
        filterPath: 'assets',
        id: 'assets',
        permissions: {
          canCreateDirectoryChild: true,
          canMove: false,
          canEdit: false,
          canDelete: false,
          canCreateDocument: true,
          canRequestFile: true,
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
      `/directories/roots?relationType=${DoctecRelationTypeEnum.ASSET}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response.data;
  }
}
