import {
  IFileManagerDirectoryResponse,
  IFileManagerFile,
} from '@modules/fileManager/interfaces/IFileManager';
import {
  DoctecRelationTypeEnum,
  IDoctecDirectoryDTO,
} from 'adapters/doctec/dtos/IDoctecDirectoryDTO';
import { doctecApi } from '@shared/services/doctec/api';

export class ListDirectoriesRootStructure {
  async execute(token: string): Promise<IFileManagerDirectoryResponse> {
    const doctecDirectories = await this.retrieveDoctecDirectories(token);

    return {
      cwd: {
        hasChild: doctecDirectories.length > 0,
        name: 'DOCUMENTOS',
        size: 0,
        isFile: false,
        type: '',
        caseSensitive: false,
        permissions: {
          canCreateDirectoryChild: false,
          canMove: false,
          canEdit: false,
          canDelete: false,
          canCreateDocument: false,
          canRequestFile: false,
        },
      } as IFileManagerFile,
      files: [
        {
          name: 'GED',
          size: 0,
          isFile: false,
          type: '',
          code: '',
          status: '',
          dateModified: '',
          caseSensitive: false,
          filterId: 'ged',
          filterPath: 'ged',
          id: 'documents',
          hasChild:
            this.retrieveChildrenByRelationType(
              doctecDirectories,
              DoctecRelationTypeEnum.DIRECTORY,
            ).length > 0,
          permissions: {
            canCreateDirectoryChild: true,
            canMove: false,
            canEdit: false,
            canDelete: false,
            canCreateDocument: true,
            canRequestFile: true,
          },
        } as IFileManagerFile,
        {
          name: 'Fornecedores',
          size: 0,
          isFile: false,
          type: '',
          code: '',
          status: '',
          dateModified: '',
          caseSensitive: false,
          filterId: 'providers',
          filterPath: 'providers',
          id: 'providers',
          hasChild:
            this.retrieveChildrenByRelationType(
              doctecDirectories,
              DoctecRelationTypeEnum.PROVIDER,
            ).length > 0,
          permissions: {
            canCreateDirectoryChild: true,
            canMove: false,
            canEdit: false,
            canDelete: false,
            canCreateDocument: true,
            canRequestFile: true,
          },
        } as IFileManagerFile,
        {
          name: 'Ativos',
          size: 0,
          isFile: false,
          type: '',
          code: '',
          status: '',
          dateModified: '',
          caseSensitive: false,
          filterId: 'assets',
          filterPath: 'assets',
          id: 'assets',
          hasChild:
            this.retrieveChildrenByRelationType(
              doctecDirectories,
              DoctecRelationTypeEnum.ASSET,
            ).length > 0,
          permissions: {
            canCreateDirectoryChild: true,
            canMove: false,
            canEdit: false,
            canDelete: false,
            canCreateDocument: true,
            canRequestFile: true,
          },
        } as IFileManagerFile,
      ],
    };
  }

  private async retrieveDoctecDirectories(
    token: string,
  ): Promise<IDoctecDirectoryDTO[]> {
    const { data: response } = await doctecApi.get('/directories/roots', {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  }

  private retrieveChildrenByRelationType(
    directories: IDoctecDirectoryDTO[],
    relationType: DoctecRelationTypeEnum,
  ) {
    return directories.filter(
      directory => directory.relationType.id === relationType,
    );
  }
}
