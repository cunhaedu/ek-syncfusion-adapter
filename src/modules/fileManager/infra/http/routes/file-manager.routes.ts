import { Router } from 'express';

import { FileManagerController } from '../controllers';

const fileManagerRoutes = Router();
const fileManagerController = new FileManagerController();

fileManagerRoutes.post('/', fileManagerController.handle);

export { fileManagerRoutes };
