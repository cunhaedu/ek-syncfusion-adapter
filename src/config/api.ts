export default (): {
  /** @default  3000 */
  PORT: number;
  /** @default 'v1/UNKNOWN' */
  BASE_URL: string;
} => {
  return {
    PORT: Number(process.env.API_REST_PORT ?? 3000),
    BASE_URL: process.env.API_BASE_URL ?? '/v1/UNKNOWN',
  };
};
