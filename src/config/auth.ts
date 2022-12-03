export default (): {
  // ENABLE: boolean;
  SECRET: string;
} => {
  return {
    // ENABLE: process.env.JWT_ENABLE?.toLowerCase() === 'true', // Enable or disable use of JWT Tokens validation requests.
    SECRET: process.env.JWT_SECRET ?? '', // Use the same secret as the responsible API that created it.
  };
};
