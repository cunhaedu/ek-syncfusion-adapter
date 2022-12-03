import axios from 'axios';
import apis from '@config/apis';

const apisConfig = apis();

export const doctecApi = axios.create({
  baseURL: apisConfig.DOCTEC_BASE_URL,
});
