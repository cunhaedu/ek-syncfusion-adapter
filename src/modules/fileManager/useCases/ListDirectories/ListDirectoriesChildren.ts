import { IFileManagerDirectoryResponse } from '@modules/fileManager/interfaces/IFileManager';
import { doctecDirectoryMapper } from 'adapters/doctec/mappers/doctecDirectoryMapper';
import { IDoctecDirectoryDTO } from 'adapters/doctec/dtos/IDoctecDirectoryDTO';
import { doctecApi } from '@shared/services/doctec/api';

export class ListDirectoriesChildren {
  async execute(
    parentId: number,
    token: string,
  ): Promise<IFileManagerDirectoryResponse> {
    const doctecDirectories = await this.retrieveDoctecDirectoriesChildren(
      parentId,
      token,
    );

    const parentDirectory = await this.retrieveParentDoctecDirectory(
      parentId,
      token,
    );

    return {
      cwd: doctecDirectoryMapper(parentDirectory),
      files: doctecDirectories.map(directory => {
        return doctecDirectoryMapper(directory);
      }),
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
