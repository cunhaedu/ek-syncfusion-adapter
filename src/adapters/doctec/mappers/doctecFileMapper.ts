import { format } from 'date-fns';

import { IFileManagerFile } from '@modules/fileManager/interfaces/IFileManager';
import { IDoctecFileDTO } from '../dtos/IDoctecFileDTO';

function retrieveFileStatusDescription(status: number): string {
  const descriptions: Record<number, string> = {
    1: 'EM DESENVOLVIMENTO',
    2: 'SOLICITADO',
    3: 'EM ANÁLISE',
    4: 'APROVAÇÃO EXPIRADA',
    5: 'PUBLICAÇÃO VENCIDA',
    6: 'REPROVADO',
    7: 'APROVADO',
  };

  return descriptions[status];
}

export function doctecFileMapper(
  file: IDoctecFileDTO,
  parentId: number,
): IFileManagerFile {
  const type = file.currentVersion.fileType;
  return {
    hasChild: false,
    caseSensitive: true,
    dateModified: format(new Date(file.createdAt), 'dd/MM/yyyy'),
    id: file.id,
    name: file.name,
    filterPath: file.id,
    filterId: file.id,
    isFile: true,
    size: 0,
    type: type ?? 'pdf',
    parentId,
    code: file.fileCode,
    status: retrieveFileStatusDescription(file.status.id),
    permissions: file.permissions,
  } as IFileManagerFile;
}
