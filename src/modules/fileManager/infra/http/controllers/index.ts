import { NextFunction, Request, Response } from 'express';

import { FileManagerActionEnum } from '@modules/fileManager/interfaces/IFileManager';
import fileManagerReadActionHandler from '../handlers/fileManagerReadAction.handler';

export class FileManagerController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { action } = req.body;
      const token = String(req.headers.authorization);

      switch (action) {
        case FileManagerActionEnum.READ: {
          res.json(await fileManagerReadActionHandler(req.body, token));
          break;
        }
        default: {
          res.json({ message: 'NO HANDLER FOUND FOR THIS ACTION' });
          break;
        }
      }
    } catch (e) {
      next(e);
    }
  }
}
