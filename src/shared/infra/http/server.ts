import api from '@config/api';
import { app } from './app';

const apiConfig = api();

app.listen(apiConfig.PORT, () => {
  console.info(`Server started on 127.0.0.1:${apiConfig.PORT}`);
});
