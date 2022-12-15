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

export class ListProviderDirectoriesRoots {
  async execute(token: string): Promise<IFileManagerDirectoryResponse> {
    const doctecDirectories = await this.retrieveDoctecDirectories(token);

    return {
      cwd: {
        hasChild: doctecDirectories.length > 0,
        name: 'Fornecedores',
        size: 0,
        isFile: false,
        type: '',
        caseSensitive: false,
        filterId: 'providers',
        filterPath: 'providers',
        id: 'providers',
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
      `/directories/roots?relationType=${DoctecRelationTypeEnum.PROVIDER}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response.data;
  }
}
