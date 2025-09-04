export const parseMessages = (messages: any[]) => {
  const result: React.ReactNode[] = [];
  for (let A = 0; A < messages.length; ++A) {
    const message = messages[A];
    if (typeof message === 'string') {
      result.push(message);
    } else if (typeof message === 'object') {
      result.push('Object');
    } else {
      result.push(String(message));
    }
  }

  return <div className='flex flex-wrap gap-2'>{result}</div>;
};
