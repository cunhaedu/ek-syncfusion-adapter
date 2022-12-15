import { IFileManagerDirectoryResponse } from '@modules/fileManager/interfaces/IFileManager';
import { doctecDirectoryMapper } from 'adapters/doctec/mappers/doctecDirectoryMapper';
import { IDoctecDirectoryDTO } from 'adapters/doctec/dtos/IDoctecDirectoryDTO';
import { doctecFileMapper } from 'adapters/doctec/mappers/doctecFileMapper';
import { doctecApi } from '@shared/services/doctec/api';

export class ListDirectoriesChildren {
  async execute(
    parentId: number,
    token: string,
  ): Promise<IFileManagerDirectoryResponse> {
    const [doctecDirectories, parentDirectory] = await Promise.all([
      this.retrieveDoctecDirectoriesChildren(parentId, token),
      this.retrieveParentDoctecDirectory(parentId, token),
    ]);

    const directories = doctecDirectories.map(directory =>
      doctecDirectoryMapper(directory),
    );

    const parentFiles = parentDirectory.files.map(file =>
      doctecFileMapper(file, parentDirectory.id),
    );

    return {
      cwd: doctecDirectoryMapper(parentDirectory),
      files: [...directories, ...parentFiles],
    };
  }

  private async retrieveDoctecDirectoriesChildren(
    parentId: number,
    token: string,
  ): Promise<IDoctecDirectoryDTO[]> {
    const { data: response } = await doctecApi.get(
      `/directories/${parentId}/children`,
      { headers: { Authorization: token } },
    );

    return response.data;
  }

  private async retrieveParentDoctecDirectory(
    id: number,
    token: string,
  ): Promise<IDoctecDirectoryDTO> {
    const { data: response } = await doctecApi.get(`/directories/${id}`, {
      headers: { Authorization: token },
    });

    return response.data;
  }
}
