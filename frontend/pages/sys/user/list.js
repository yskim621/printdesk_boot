import { useState, useEffect } from 'react';
import AppLayout from '../../../src/containers/layout/app';

const SysUserList = () => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <AppLayout>
      {!isMount ? (
        <div className="loading" />
      ) : (
        <>{`환경설정 > 권한관리 > 사용자관리`}</>
      )}
    </AppLayout>
  );
};

export default SysUserList;
