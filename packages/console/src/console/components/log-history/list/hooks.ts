import { useCallback, useEffect, useState } from 'react';
import { API } from '../../../../api';

const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export const useLogHistory = () => {
  const handleLogChange = useUpdate();

  useEffect(() => {
    API.addLogListener(handleLogChange);

    return () => {
      API.removeLogListener(handleLogChange);
    };
  }, [handleLogChange]);

  const logs = API.getLogHistory();

  return logs;
};
