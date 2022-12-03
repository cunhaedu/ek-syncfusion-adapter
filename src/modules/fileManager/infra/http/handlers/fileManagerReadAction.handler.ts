import { ListProviderDirectoriesRoots } from '@modules/fileManager/useCases/ListDirectories/ListProvidersDirectoriesRoots';
import { ListDirectoriesRootStructure } from '@modules/fileManager/useCases/ListDirectories/ListDirectoriesRootStructure';
import { ListAssetDirectoriesRoots } from '@modules/fileManager/useCases/ListDirectories/ListAssetDirectoriesRoots';
import { ListDirectoriesChildren } from '@modules/fileManager/useCases/ListDirectories/ListDirectoriesChildren';
import { ListGEDDirectoriesRoots } from '@modules/fileManager/useCases/ListDirectories/ListGEDDirectoriesRoots';
import { IFileManagerRequest } from '@modules/fileManager/interfaces/IFileManager';

function listDirectoriesRootsHandler(token: string) {
  const listDirectoriesRoots = new ListDirectoriesRootStructure();

  return listDirectoriesRoots.execute(token);
}

function listGEDDirectoriesRootsHandler(token: string) {
  const listDirectoriesRoots = new ListGEDDirectoriesRoots();

  return listDirectoriesRoots.execute(token);
}

function listAssetDirectoriesRootsHandler(token: string) {
  const listDirectoriesRoots = new ListAssetDirectoriesRoots();

  return listDirectoriesRoots.execute(token);
}

function listProviderDirectoriesRootsHandler(token: string) {
  const listDirectoriesRoots = new ListProviderDirectoriesRoots();

  return listDirectoriesRoots.execute(token);
}

function listDirectoriesChildrenHandler(parentId: number, token: string) {
  const listDirectoriesRoots = new ListDirectoriesChildren();

  return listDirectoriesRoots.execute(parentId, token);
}

export default async function fileManagerReadActionHandler(
  body: IFileManagerRequest,
  token: string,
): Promise<unknown> {
  if (body.path === '/') {
    return listDirectoriesRootsHandler(token);
  }

  const path = body.path.replace('null', '');

  if (path === '/documents/') {
    return listGEDDirectoriesRootsHandler(token);
  }

  if (path === '/assets/') {
    return listAssetDirectoriesRootsHandler(token);
  }

  if (path === '/providers/') {
    return listProviderDirectoriesRootsHandler(token);
  }

  const filterId = body.path
    .split('/')
    .filter(e => e !== '')
    .pop();

  if (filterId && parseInt(filterId, 10) > 0) {
    return listDirectoriesChildrenHandler(Number(filterId), token);
  }

  return {};
}
