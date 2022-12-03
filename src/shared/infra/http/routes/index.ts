import { fileManagerRoutes } from '@modules/fileManager/infra/http/routes/file-manager.routes';
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';

const routes = Router();

routes.use(authMiddleware);
routes.use('/file-manager', fileManagerRoutes);

export { routes };
