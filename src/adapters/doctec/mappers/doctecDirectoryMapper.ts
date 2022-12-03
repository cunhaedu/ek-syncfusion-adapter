import { IFileManagerFile } from '@modules/fileManager/interfaces/IFileManager';
import { IDoctecDirectoryDTO } from '../dtos/IDoctecDirectoryDTO';

export function doctecDirectoryMapper(
  directory: IDoctecDirectoryDTO,
): IFileManagerFile {
  return {
    hasChild: directory.hasChildren,
    caseSensitive: true,
    dateCreated: directory.createdAt,
    dateModified: directory.updatedAt,
    id: directory.id,
    name: directory.description,
    filterPath: directory.id,
    filterId: directory.id,
    isFile: false,
    type: '',
  } as IFileManagerFile;
}
