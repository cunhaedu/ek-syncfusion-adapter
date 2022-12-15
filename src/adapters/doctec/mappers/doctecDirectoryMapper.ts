import { format } from 'date-fns';

import { IFileManagerFile } from '@modules/fileManager/interfaces/IFileManager';
import { IDoctecDirectoryDTO } from '../dtos/IDoctecDirectoryDTO';

export function doctecDirectoryMapper(
  directory: IDoctecDirectoryDTO,
): IFileManagerFile {
  return {
    hasChild: directory.hasChildren,
    caseSensitive: true,
    dateModified: format(new Date(directory.updatedAt), 'dd/MM/yyyy'),
    id: directory.id,
    name: directory.description,
    filterPath: directory.id,
    filterId: directory.id,
    isFile: false,
    size: 0,
    type: '',
    code: '',
    status: '',
    permissions: directory.permissions,
  } as IFileManagerFile;
}
