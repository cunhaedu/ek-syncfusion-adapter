export default (): {
  /** @default  'http://localhost:3000/v2/doctec' */
  DOCTEC_BASE_URL: string;
} => {
  return {
    DOCTEC_BASE_URL: String(
      process.env.DOCTEC_BASE_URL ?? 'http://localhost:3000/v2/doctec',
    ),
  };
};
