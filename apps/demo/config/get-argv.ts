export const getParamsFromArgv = (argv: string[]): Record<string, string | true> => {
  const result: Record<string, string | true> = {};
  for (let A = 0; A < argv.length; ++A) {
    if (argv[A].startsWith('--') && argv[A].length > 2) {
      result[argv[A].slice(2)] = !argv[A + 1] || argv[A + 1].startsWith('--') ? true : argv[A + 1];
    }
  }

  return result;
};
